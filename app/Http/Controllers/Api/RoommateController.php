<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
    public function store(Request $request)
    {
        $request->validate([
            'available_from' => ['required', 'date', 'after:today'],
            'minimum_stay' => ['required'],
            'maximum_stay' => ['required'],
            'days_available' =>['required'], 
            'short_term' => ['sometimes'],
            'first_name' => ['required'],
            'last_name' => ['required'],
            'display_last_name' => ['sometimes'],
            'telephone' => ['required'],
            'display_telephone' => ['sometimes'],
            'new_flatmate_min_age' => ['required', 'numeric'],
            'new_flatmate_max_age' => ['required', 'numeric'],
            'new_flatmate_smoker' => ['required'],
            'new_flatmate_pets' => ['sometimes'],
            'new_flatmate_references' => ['sometimes'],
            'new_flatmate_couples' => ['sometimes'],
            'new_flatmate_gender' => ['required'],
            'new_flatmate_occupation' => ['required'],
            'new_flatmate_hobbies' => ['sometimes'],
        ]);

        $data = $request->validate([
            'title' => ['required', 'min:4', 'max:30'],
            'description' => ['required', 'min:50', 'max:1000'],
            'budget' => ['required'],
            'searching_for' => ['required'],
            'room_size' => ['required'],
            'user_id' => ['sometimes'],
            'live_at' => ['sometimes'],
            'available' => ['sometimes'],
            'age' => ['required'],
            'smoker' => ['required'],
            'pets' => ['required'],
            'occupation' => ['required'],
            'gender' => ['required'],
            'hobbies' => ['required', 'array', 'min:1', 'max:15'],
            'amenities' => ['required', 'array', 'min:1'],
            'area' => ['required'],
            'city' => ['required'],
            'images' => ['required', 'array'],
        ]);
       
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
        $data['images'] = $images;

        $roommate = auth()->user()->roommates()->create($data);

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
    public function update(Request $request, Roommate $roommate)
    {
        if ($request->user()->id !== $roommate->user_id) {
            abort(403); // Return a forbidden response
        }

        $request->validate([
            'available_from' => ['required', 'date', 'after:tomorrow'],
            'minimum_stay' => ['required'],
            'maximum_stay' => ['required', 'gt:minimum_stay'],
            'days_available' =>['required'], 
            'short_term' => ['sometimes'],
            'first_name' => ['required', 'max:20'],
            'last_name' => ['required', 'max:20'],
            'display_last_name' => ['sometimes'],
            'telephone' => ['required'],
            'display_telephone' => ['sometimes'],
            'new_flatmate_min_age' => ['required', 'numeric', 'min:18'],
            'new_flatmate_max_age' => [
                'required', 
                'numeric', 
                'min:18', 
                'gt:new_flatmate_min_age'
            ],
            'new_flatmate_smoker' => ['required'],
            'new_flatmate_pets' => ['required'],
            'new_flatmate_references' => ['required'],
            'new_flatmate_couples' => ['sometimes'],
            'new_flatmate_gender' => ['required'],
            'new_flatmate_occupation' => ['required'],
            'new_flatmate_hobbies' => ['sometimes'],
        ] ,[
            'maximum_stay.required' => 'The maximum stay is required',
            'minimum_stay.required' => 'The minimum stay is required',
            'first_name.required' => 'The first name field is required',
            'last_name.required' => 'The last name field is required',
            'days_available.required' => 'The days available field is required',
            'new_flatmate_smoker.required' => 'The new flatmate smoker field is required',
            'new_flatmate_pets.required' => 'The new flatmate pets field is required',
            'new_flatmate_occupation.required' => 'The new flatmate occupation field is required',
            'new_flatmate_gender.required' => 'The new flatmate gender field is required',
            'new_flatmate_min_age.required' => 'The new flatmate minimum age field is required',
            'new_flatmate_min_age.numeric' => 'This does not appear to be a number',
            'new_flatmate_min_age.before' => 'Your new flatmate should be more than 18 years old',
            'new_flatmate_max_age.required' => 'The new flatmate maximum age field is required',
            'new_flatmate_max_age.numeric' => 'This does not appear to be a number',
            'new_flatmate_max_age.after' => 'The :attribute must be greater than the min age',
            'new_flatmate_max_age.before' => 'Your new flatmate should be more than 18 years old',
        ]);

        $data = $request->validate([
            'title' => ['required', 'min:4', 'max:30'],
            'description' => ['required', 'min:50', 'max:1000'],
            'budget' => ['required', 'numeric'],
            'searching_for' => ['required'],
            'room_size' => ['required'],
            'user_id' => ['sometimes'],
            'live_at' => ['sometimes'],
            'available' => ['sometimes'],
            'age' => ['required', 'numeric' ,'min:18'],
            'smoker' => ['required'],
            'pets' => ['required'],
            'occupation' => ['required'],
            'gender' => ['required'],
            'hobbies' => ['required', 'array', 'min:1', 'max:15'],
            'amenities' => ['required', 'array', 'min:1'],
            'area' => ['required'],
            'city' => ['required'],
            'images' => ['sometimes', 'array'],
        ], [
            'searching_for.required' => 'The searching for field is required',
            'room_size.required' => 'The room size field is required',
        ]);

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

        //Assigning the images to data['images']
        $data['images'] = $images;

        $roommate->update($data);

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
