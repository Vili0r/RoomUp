<?php

namespace App\Http\Controllers;

use App\Enums\AvailableRooms;
use App\Enums\CurrentFlatmateGender;
use App\Enums\CurrentFlatmateOccupation;
use App\Enums\CurrentFlatmateSmoking;
use App\Enums\CurrentOccupants;
use App\Enums\DaysAvailable;
use App\Enums\Furnishings;
use App\Enums\MaximumStay;
use App\Enums\MinimumStay;
use App\Enums\Minutes;
use App\Enums\Mode;
use App\Enums\NewFlatmateGender;
use App\Enums\NewFlatmateOccupation;
use App\Enums\NewFlatmateSmoking;
use App\Enums\Pets;
use App\Enums\References;
use App\Enums\RoomSize;
use App\Enums\Size;
use App\Enums\Stations;
use App\Enums\Type;
use App\Enums\WhatIAm;
use App\Http\Requests\SharedStoreRequest;
use App\Http\Requests\SharedUpdateRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\AmenitiesResource;
use App\Http\Resources\EnumResource;
use App\Http\Resources\SharedEditResource;
use App\Http\Resources\SharedShowResource;
use App\Models\Amenity;
use App\Models\Room;
use App\Models\Shared;
use App\Models\TemporaryImage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\RedirectResponse;

class SharedController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render("Shared/Create", [
            'whatIAm' => EnumResource::collection(WhatIAm::cases()),
            'size' => EnumResource::collection(Size::cases()),
            'type' => EnumResource::collection(Type::cases()),
            'availableRooms' => EnumResource::collection(AvailableRooms::cases()),
            'currentOccupants' => EnumResource::collection(CurrentOccupants::cases()),
            'minutes' => EnumResource::collection(Minutes::cases()),
            'mode' => EnumResource::collection(Mode::cases()),
            'stations' => EnumResource::collection(Stations::cases()),
            'amenities' => AmenitiesResource::collection(Amenity::all()),
            'roomSize' => EnumResource::collection(RoomSize::cases()),
            'furnishings' => EnumResource::collection(Furnishings::cases()),
            'daysAvailable' => EnumResource::collection(DaysAvailable::cases()),
            'minimumStay' => EnumResource::collection(MinimumStay::cases()),
            'maximumStay' => EnumResource::collection(MaximumStay::cases()),
            'newFlatmateSmoking' => EnumResource::collection(NewFlatmateSmoking::cases()),
            'currentFlatmateSmoking' => EnumResource::collection(CurrentFlatmateSmoking::cases()),
            'newFlatmateGender' => EnumResource::collection(NewFlatmateGender::cases()),
            'currentFlatmateGender' => EnumResource::collection(CurrentFlatmateGender::cases()),
            'newFlatmateOccupation' => EnumResource::collection(NewFlatmateOccupation::cases()),
            'currentFlatmateOccupation' => EnumResource::collection(CurrentFlatmateOccupation::cases()),
            'pets' => EnumResource::collection(Pets::cases()),
            'references' => EnumResource::collection(References::cases()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SharedStoreRequest $request): RedirectResponse
    {
        $images = [];
        if (!empty($request->images)) {
            foreach ($request->images as $image) {
                $image_path = 'images/' . $image;

                //Copying the temporary image in a new permanent folder
                Storage::copy('public/image/' . $image, $image_path);
                
                //Adding the new images to the existing images array
                array_push($images, $image_path);
                
                //Deleting the temporary images from public/images
                Storage::delete('public/image/' . $image);

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

        $shared->amenities()->attach($request->input('amenities.*.id'));
        
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

            $shared->rooms()->create([
                'room_size' => $room['room_size'],
                'room_cost' => $room['room_cost'],
                'room_deposit' => $room['room_deposit'],
                'room_furnished' => $room['room_furnished'],
                'room_references' => $room['room_references'] == null ? 0 : 1,
                'available_from' => $room['available_from'],
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

        return to_route('shared.show', $shared)->with('message', 'Please update your rooms individually');
    }

    /**
     * Display the specified resource.
     */
    public function show(Shared $shared): Response
    {
        if (auth()->id() !== $shared->user_id) {
            abort(403); // Return a forbidden response
        }

        $shared->load(['address', 'rooms']);

        return Inertia::render("Shared/Show", [
            'shared' => new SharedShowResource($shared),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shared $shared): Response
    {
        if (auth()->id() !== $shared->user_id) {
            abort(403); // Return a forbidden response
        }

        $shared->load(['amenities', 'advertiser', 'address', 'transport', 'flatmate', 'rooms']);

        return Inertia::render("Shared/Edit", [
            'shared' => new SharedEditResource($shared),
            'whatIAm' => EnumResource::collection(WhatIAm::cases()),
            'size' => EnumResource::collection(Size::cases()),
            'type' => EnumResource::collection(Type::cases()),
            'availableRooms' => EnumResource::collection(AvailableRooms::cases()),
            'currentOccupants' => EnumResource::collection(CurrentOccupants::cases()),
            'minutes' => EnumResource::collection(Minutes::cases()),
            'mode' => EnumResource::collection(Mode::cases()),
            'stations' => EnumResource::collection(Stations::cases()),
            'amenities' => AmenitiesResource::collection(Amenity::all()),
            'roomSize' => EnumResource::collection(RoomSize::cases()),
            'furnishings' => EnumResource::collection(Furnishings::cases()),
            'daysAvailable' => EnumResource::collection(DaysAvailable::cases()),
            'minimumStay' => EnumResource::collection(MinimumStay::cases()),
            'maximumStay' => EnumResource::collection(MaximumStay::cases()),
            'newFlatmateSmoking' => EnumResource::collection(NewFlatmateSmoking::cases()),
            'currentFlatmateSmoking' => EnumResource::collection(CurrentFlatmateSmoking::cases()),
            'newFlatmateGender' => EnumResource::collection(NewFlatmateGender::cases()),
            'currentFlatmateGender' => EnumResource::collection(CurrentFlatmateGender::cases()),
            'newFlatmateOccupation' => EnumResource::collection(NewFlatmateOccupation::cases()),
            'currentFlatmateOccupation' => EnumResource::collection(CurrentFlatmateOccupation::cases()),
            'pets' => EnumResource::collection(Pets::cases()),
            'references' => EnumResource::collection(References::cases()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SharedUpdateRequest $request, Shared $shared): RedirectResponse
    {
        if (auth()->id() !== $shared->user_id) {
            abort(403); // Return a forbidden response
        }

        //Creating empty array
        $images = [];
        //Assinging the alredy existing images in the database
        $images = $shared->images;
        //dd($images, $request->images);
        if (!empty($request->images)) {
            foreach ($request->images as $image) {
                $image_path = 'images/' . $image;

                //Copying the temporary image in a new permanent folder
                Storage::copy('public/image/' . $image, $image_path);
                
                //Adding the new images to the existing images array
                array_push($images, $image_path);
                
                //Deleting the temporary images from public/images
                Storage::delete('public/image/' . $image);

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

        $shared->amenities()->sync($request->input('amenities.*.id'));

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

        return to_route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shared $shared): RedirectResponse
    {
        if (auth()->id() !== $shared->user_id) {
            abort(403); // Return a forbidden response
        }
        
        Storage::delete($shared->images);
        $shared->delete();

        return to_route("dashboard");
    }
}
