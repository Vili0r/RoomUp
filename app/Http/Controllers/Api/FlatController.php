<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Flat;
use App\Models\TemporaryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class FlatController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'amenities' => ['required'],
            'address_1' => ['required'],
            'address_2' => ['sometimes'],
            'area' => ['required'],
            'city' => ['required'],
            'post_code' => ['required'],
            'minutes' => ['required'],
            'mode' => ['required'],
            'station' => ['required'],
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
            'available_from' => ['required', 'date', 'after:today'],
            'minimum_stay' => ['required'],
            'maximum_stay' => ['required'],
            'days_available' =>['required'], 
            'short_term' => ['sometimes'],
        ]);

        $data = $request->validate([
            'title' => ['required', 'min:10', 'max:50'],
            'description' => ['required', 'min:50', 'max:500'],
            'cost' => ['required', 'numeric'],
            'deposit' => ['required', 'numeric'],
            'size' => ['required', 'integer'],
            'type' => ['required', 'integer'],
            'live_at' => ['sometimes'],
            'what_i_am' => ['required'],
            'furnished' => ['required'],
            'featured' => ['sometimes'],
            'available' => ['sometimes'],
            'user_id' => ['sometimes'],
            'images' => ['required'],
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

        $flat = auth()->user()->flats()->create($data);

        foreach ($request->input('amenities') as $amenityId) {
            $flat->amenities()->attach($amenityId);
        }
        
        $flat->address()->create([
            'address_1' => $request->address_1,
            'address_2' => $request->address_2,
            'area' => $request->area,
            'city' => $request->city,
            'post_code' => $request->post_code,
            'lat' => $request->lat,
            'long' => $request->long,
            'display_name' => $request->display_name,
        ]);
       
        $flat->advertiser()->create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'display_last_name' => $request->display_last_name == null ? 0 : 1,
            'telephone' => $request->telephone,
            'display_telephone' => $request->display_telephone == null ? 0 : 1,
        ]);
        
        $flat->transport()->create([
            'minutes' => $request->minutes,
            'mode' => $request->mode,
            'station' => $request->station,
        ]);
        
        $flat->flatmate()->create([
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
        $flat->availability()->create([
            'available_from' => $carbonDate->format('Y-m-d'),
            'minimum_stay' => $request->minimum_stay,
            'maximum_stay' => $request->maximum_stay,
            'days_available' => $request->days_available,
            'short_term' => $request->short_term == null ? 0 : 1,
        ]);

        return response()->json('Flat added successfully', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Flat $flat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Flat $flat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Flat $flat)
    {
        if ($request->user()->id !== $flat->user_id) {
            abort(403); // Return a forbidden response
        }

        $request->validate([
            'address_1' => ['required', 'max:30'],
            'address_2' => ['sometimes'],
            'area' => ['required', 'max:20'],
            'city' => ['required', 'max:20'],
            'post_code' => ['required', 'max:7'],
            'minutes' => ['required'],
            'mode' => ['required'],
            'station' => ['required'],
            'first_name' => ['required', 'max:20'],
            'last_name' => ['required', 'max:20'],
            'display_last_name' => ['sometimes'],
            'telephone' => ['required'],
            'display_telephone' => ['sometimes'],
            'station' => ['required'],
            'new_flatmate_min_age' => [
                'required', 
                'numeric', 
                'min:18'
            ],
            'new_flatmate_max_age' => [
                'required', 
                'numeric', 
                'min:18',
                'gt:new_flatmate_min_age'
            ],
            'new_flatmate_smoker' => ['required'],
            'new_flatmate_pets' => ['sometimes'],
            'new_flatmate_references' => ['sometimes'],
            'new_flatmate_couples' => ['sometimes'],
            'new_flatmate_gender' => ['required'],
            'new_flatmate_occupation' => ['required'],
            'new_flatmate_hobbies' => ['sometimes'],
            'available_from' => ['required', 'after:tomorrow'],
            'days_available' => ['required'],
            'maximum_stay' => ['required','gt:minimum_stay'],
            'minimum_stay' => ['required'],
            'short_term' => ['sometimes'],
            'amenities' => ['required'],
        ],[
            'available_from.required' => 'The available from field is required',
            'days_available.required' => 'The days available field is required',
            'maximum_stay.required' => 'The maximum stay field is required',
            'maximum_stay.gt' => 'The maximum stay field must be greater than minimum stay',
            'minimum_stay.required' => 'The minimum stay field is required',
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
            'post_code.required' => 'The post code field is required',
            'address_1.required' => 'The address field is required',
            'what_i_am.required' => 'Your current status field is required',
            'first_name.required' => 'The first name field is required',
            'last_name.required' => 'The last name field is required',
        ]);

        $data = $request->validate([
            'title' => ['required', 'min:10', 'max:50'],
            'description' => ['required',  'min:50', 'max:500'],
            'cost' => ['required', 'numeric'],
            'deposit' => ['required', 'numeric'],
            'size' => ['required', 'integer'],
            'type' => ['required', 'integer'],
            'live_at' => ['sometimes'],
            'what_i_am' => ['required'],
            'furnished' => ['required'],
            'featured' => ['sometimes'],
            'available' => ['sometimes'],
            'user_id' => ['sometimes'],
            'images' => ['sometimes', 'max:9'],
        ]);
       
        //Creating empty array
        $images = [];
        //Assinging the alredy existing images in the database
        $images = $flat->images;
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

        //Assigning the images to data['images']
        $data['images'] = $images;
        
        //Updating Flat
        $flat->update($data);

        $flat->amenities()->sync($request->input('amenities.*.id'));
       
        $flat->advertiser()->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'display_last_name' => $request->display_last_name == null ? 0 : 1,
            'telephone' => $request->telephone,
            'display_telephone' => $request->display_telephone == null ? 0 : 1,
        ]);
        
        $flat->transport()->update([
            'minutes' => $request->minutes,
            'mode' => $request->mode,
            'station' => $request->station,
        ]);
        
        $flat->flatmate()->update([
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

        $flat->availability()->update([
            'available_from' => $request->available_from,
            'minimum_stay' => $request->minimum_stay,
            'maximum_stay' => $request->maximum_stay,
            'days_available' => $request->days_available,
            'short_term' => $request->short_term == null ? 0 : 1,
        ]);

        return response()->json('Flat added successfully', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Flat $flat)
    {
        if ($request->user()->id !== $flat->user_id) {
            abort(403); // Return a forbidden response
        }

        Storage::delete($flat->images);
        $flat->delete();

        return response()->noContent();
    }
}
