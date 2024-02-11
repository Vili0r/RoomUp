<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SharedStoreRequest;
use App\Http\Requests\SharedUpdateRequest;
use App\Models\Shared;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use App\Models\TemporaryImage;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\Api\SharedEditResource;
use App\Http\Resources\SharedShowResource;
use App\Models\Room;

class SharedController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(SharedStoreRequest $request)
    {
        $images = [];
        if (!empty($request->images)) {
            foreach ($request->images as $image) {
                //Adding the new images to the existing images array
                array_push($images, $image);
            
                //Deleting the temporary from database
                $temporaryImage = TemporaryImage::where('file', $image)->first();
                $temporaryImage->delete();
            }
        }

        $shared = auth()->user()->shareds()->create([
            'title' => $request->title,
            'description' => $request->description,
            'available_rooms' => $request->available_rooms,
            'size' => $request->size,
            'type' => $request->type,
            'current_occupants' => $request->current_occupants,
            'what_i_am' => $request->what_i_am,
            'current_flatmate_age' => $request->current_flatmate_age,
            'current_flatmate_smoker' => $request->current_flatmate_smoker,
            'current_flatmate_pets' => $request->current_flatmate_pets,
            'current_flatmate_occupation' => $request->current_flatmate_occupation,
            'current_flatmate_gender' => $request->current_flatmate_gender,
            'images' => $images,
        ]);

        foreach ($request->input('amenities') as $amenityId) {
            $shared->amenities()->attach($amenityId);
        }

        foreach ($request->rooms as $room) {
            Validator::make($room, [
                'room_size' => ['required'],
                'room_cost' => ['required'],
                'room_deposit' => ['required'],
                'room_furnished' => ['required'],
                'room_references' => ['sometimes'],
                'available_from' => ['required', 'date', 'after:today'],
                'minimum_stay' => ['required'],
                'maximum_stay' => ['required'],
                'days_available' =>['required'], 
                'short_term' => ['sometimes'],
                'sub_title' => ['sometimes'],
                'sub_description' => ['sometimes'],
                'images' => ['sometimes'],
            ]);

            $carbonDate = Carbon::parse($room['available_from']);
            $shared->rooms()->create([
                'room_size' => $room['room_size'],
                'room_cost' => $room['room_cost'],
                'room_deposit' => $room['room_deposit'],
                'room_furnished' => $room['room_furnished'],
                'room_references' => $room['room_references'] == null ? 0 : 1,
                'available_from' => $carbonDate->format('Y-m-d'),
                'minimum_stay' => $room['minimum_stay'],
                'maximum_stay' => $room['maximum_stay'],
                'days_available' => $room['days_available'],
                'short_term' => $room['short_term'] == null ? 0 : 1,
                'owner_type' => "APP\Models\Shared",
                'owner_id' => $shared->id,
            ]);
        }

        $shared->address()->create([
            'address_1' => $request->address_1,
            'address_2' => $request->address_2,
            'area' => $request->area,
            'city' => $request->city,
            'post_code' => $request->post_code,
            'lat' => $request->lat,
            'long' => $request->long,
            'display_name' => $request->display_name,
        ]);
       
        $shared->advertiser()->create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'display_last_name' => $request->display_last_name == null ? 0 : 1,
            'telephone' => $request->telephone,
            'display_telephone' => $request->display_telephone == null ? 0 : 1,
        ]);
        
        $shared->transport()->create([
            'minutes' => $request->minutes,
            'mode' => $request->mode,
            'station' => $request->station,
        ]);
        
        $shared->flatmate()->create([
            'new_flatmate_min_age' => $request->new_flatmate_min_age,
            'new_flatmate_max_age' => $request->new_flatmate_max_age,
            'new_flatmate_smoker' => $request->new_flatmate_smoker,
            'new_flatmate_pets' => $request->new_flatmate_pets,
            'new_flatmate_references' => $request->new_flatmate_references == null ? 0 : 1,
            'new_flatmate_couples' => $request->new_flatmate_couples == null ? 0 : 1,
            'new_flatmate_occupation' => $request->new_flatmate_occupation,
            'new_flatmate_gender' => $request->new_flatmate_gender,
            'new_flatmate_hobbies' => $request->new_flatmate_hobbies,
        ]);

        return response()->json('Shared property added successfully', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Shared $shared)
    {
        if ($request->user()->id !== $shared->user_id) {
            abort(403); // Return a forbidden response
        }

        $shared->load(['address', 'rooms', 'tour']);

        return response()->json([
            'shared' => new SharedShowResource($shared),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Shared $shared)
    {
        if ($request->user()->id !== $shared->user_id) {
            abort(403); // Return a forbidden response
        }

        $shared->load(['amenities', 'advertiser', 'address', 'transport', 'flatmate', 'rooms']);

        return response()->json([
            'shared' => new SharedEditResource($shared),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SharedUpdateRequest $request, Shared $shared)
    {
        if ($request->user()->id !== $shared->user_id) {
            abort(403); // Return a forbidden response
        }

        //Creating empty array
        $images = [];
        //Assinging the alredy existing images in the database
        $images = $shared->images;
        if (!empty($request->images)) {
            foreach ($request->images as $image) {
                //Adding the new images to the existing images array
                array_push($images, $image);
            
                //Deleting the temporary from database
                $temporaryImage = TemporaryImage::where('file', $image)->first();
                $temporaryImage->delete();
            }
        }

        //Updating shared
        $shared->update([
            'title' => $request->title,
            'description' => $request->description,
            'available_rooms' => $request->available_rooms,
            'size' => $request->size,
            'type' => $request->type,
            'current_occupants' => $request->current_occupants,
            'what_i_am' => $request->what_i_am,
            'current_flatmate_age' => $request->current_flatmate_age,
            'current_flatmate_smoker' => $request->current_flatmate_smoker,
            'current_flatmate_pets' => $request->current_flatmate_pets,
            'current_flatmate_occupation' => $request->current_flatmate_occupation,
            'current_flatmate_gender' => $request->current_flatmate_gender,
            'images' => $images,
        ]);

        $shared->amenities()->sync($request->input('amenities'));

         // UPDATING ROOMS
        // Retrieve the current rooms associated with the shared
        $currentRooms = $shared->rooms;

        // Loop through the provided rooms and update/create as necessary
        foreach ($request->rooms as $roomData) {
            if (isset($roomData['id'])) {
                // If the room ID is provided, find the room in the current rooms
                $room = $currentRooms->where('id', $roomData['id'])->first();
            } else {
                // If the room ID is not provided, assume a new room is being created
                $room = new Room();
            }
            // Update the room with the provided data
            $room->fill($roomData);
            // Save the room and associate it with the apartment
            $shared->rooms()->save($room);
        }

        // Delete any rooms that were not provided in the rooms array
        $currentRooms->whereNotIn('id', collect($request->rooms)->pluck('id'))->each(function ($room) {
            $room->delete();
        });
       
        $shared->address()->update([
            'address_1' => $request->address_1,
            'address_2' => $request->address_2,
            'area' => $request->area,
            'city' => $request->city,
            'post_code' => $request->post_code,
            'lat' => $request->lat,
            'long' => $request->long,
            'display_name' => $request->display_name,
        ]);

        $shared->advertiser()->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'display_last_name' => $request->display_last_name == null ? 0 : 1,
            'telephone' => $request->telephone,
            'display_telephone' => $request->display_telephone == null ? 0 : 1,
        ]);
        
        $shared->transport()->update([
            'minutes' => $request->minutes,
            'mode' => $request->mode,
            'station' => $request->station,
        ]);
        
        $shared->flatmate()->update([
            'new_flatmate_min_age' => $request->new_flatmate_min_age,
            'new_flatmate_max_age' => $request->new_flatmate_max_age,
            'new_flatmate_smoker' => $request->new_flatmate_smoker,
            'new_flatmate_pets' => $request->new_flatmate_pets,
            'new_flatmate_references' => $request->new_flatmate_references == null ? 0 : 1,
            'new_flatmate_couples' => $request->new_flatmate_couples == null ? 0 : 1,
            'new_flatmate_occupation' => $request->new_flatmate_occupation,
            'new_flatmate_gender' => $request->new_flatmate_gender,
            'new_flatmate_hobbies' => $request->new_flatmate_hobbies,
        ]);

        return response()->json('Shared property updated successfully', 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Shared $shared)
    {
        if ($request->user()->id !== $shared->user_id) {
            abort(403); // Return a forbidden response
        }

        Storage::delete($shared->images);
        $shared->delete();

        return response()->noContent();
    }
}
