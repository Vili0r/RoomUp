<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoommateStoreRequest;
use App\Http\Requests\RoommateUpdateRequest;
use App\Http\Resources\Roommate\RoommateEditResource;
use App\Http\Resources\Roommate\RoommateIndexResource;
use App\Models\Roommate;
use App\Models\TemporaryImage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RoommateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json( [
            'roommates' => RoommateIndexResource::collection(
                Roommate::where('user_id', $request->user()->id)   
                        ->latest()
                        ->paginate()
                )
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoommateStoreRequest $request)
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

        $roommate = auth()->user()->roommates()->create([
            'title' => $request->title,
            'description' => $request->description,
            'budget' => $request->budget,
            'searching_for' => $request->searching_for,
            'room_size' => $request->room_size,
            'area' => $request->area,
            'city' => $request->city,
            'age' => $request->age,
            'smoker' => $request->smoker,
            'pets' => $request->pets,
            'occupation' => $request->occupation,
            'gender' => $request->gender,
            'images' => $images
        ]);

        foreach ($request->input('amenities') as $amenityId) {
            $roommate->amenities()->attach($amenityId);
        }
        foreach ($request->input('hobbies') as $hobbyId) {
            $roommate->hobbies()->attach($hobbyId);
        }

        $roommate->advertiser()->create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'display_last_name' => $request->display_last_name == null ? 0 : 1,
            'telephone' => $request->telephone,
            'display_telephone' => $request->display_telephone == null ? 0 : 1,
        ]);
        
        $roommate->flatmate()->create([
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

        $carbonDate = Carbon::parse($request->available_from);
        $roommate->availability()->create([
            'available_from' => $carbonDate->format('Y-m-d'),
            'minimum_stay' => $request->minimum_stay,
            'maximum_stay' => $request->maximum_stay,
            'days_available' => $request->days_available,
            'short_term' => $request->short_term == null ? 0 : 1,
        ]);

        return response()->json('Listing added successfully', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Roommate $roommate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Roommate $roommate)
    {
        if ($request->user()->id !== $roommate->user_id) {
            abort(403); // Return a forbidden response
        }

        $roommate->load(['availability', 'flatmate', 'advertiser', 'amenities', 'hobbies']);

        return response()->json([
            'roommate' => new RoommateEditResource($roommate),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoommateUpdateRequest $request, Roommate $roommate)
    {
        if ($request->user()->id !== $roommate->user_id) {
            abort(403); // Return a forbidden response
        }

        //Creating empty array
        $images = [];
        //Assinging the alredy existing images in the database
        $images = $roommate->images;
        if (!empty($request->images)) {
            foreach ($request->images as $image) {
                //Adding the new images to the existing images array
                array_push($images, $image);
            
                //Deleting the temporary from database
                $temporaryImage = TemporaryImage::where('file', $image)->first();
                $temporaryImage->delete();
            }
        }

        $roommate->update([
            'title' => $request->title,
            'description' => $request->description,
            'budget' => $request->budget,
            'searching_for' => $request->searching_for,
            'room_size' => $request->room_size,
            'area' => $request->area,
            'city' => $request->city,
            'age' => $request->age,
            'smoker' => $request->smoker,
            'pets' => $request->pets,
            'occupation' => $request->occupation,
            'gender' => $request->gender,
            'images' => $images
        ]);

        $roommate->amenities()->sync($request->input('amenities'));
        $roommate->hobbies()->sync($request->input('hobbies'));
       
        $roommate->advertiser()->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'display_last_name' => $request->display_last_name == null ? 0 : 1,
            'telephone' => $request->telephone,
            'display_telephone' => $request->display_telephone == null ? 0 : 1,
        ]);
        
        $roommate->flatmate()->update([
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

        $carbonDate = Carbon::parse($request->available_from);
        $roommate->availability()->update([
            'available_from' => $carbonDate->format('Y-m-d'),
            'minimum_stay' => $request->minimum_stay,
            'maximum_stay' => $request->maximum_stay,
            'days_available' => $request->days_available,
            'short_term' => $request->short_term == null ? 0 : 1,
        ]);

        return response()->json('Listing updated successfully', 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Roommate $roommate)
    {
        if ($request->user()->id !== $roommate->user_id) {
            abort(403); // Return a forbidden response
        }

        Storage::delete($roommate->images);
        $roommate->delete();
        
        return response()->noContent();
    }
}
