<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FlatStoreRequest;
use App\Http\Requests\FlatUpdateRequest;
use App\Models\Flat;
use App\Models\TemporaryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use App\Http\Resources\FlatResource;

class FlatController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(FlatStoreRequest $request)
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

        $flat = auth()->user()->flats()->create([
            'title' => $request->title,
            'description' => $request->description,
            'cost' => $request->cost,
            'deposit' => $request->deposit,
            'size' => $request->size,
            'type' => $request->type,
            'what_i_am' => $request->what_i_am,
            'furnished' => $request->furnished,
            'images' => $images,
        ]);

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
    public function edit(Request $request, Flat $flat)
    {
        if ($request->user()->id !== $flat->user_id) {
            abort(403); // Return a forbidden response
        }

        $flat->load([
            'amenities', 
            'advertiser', 
            'address', 
            'transport', 
            'flatmate', 
            'availability',
            'tour',
        ]);

        return response()->json([
            'flat' => new FlatResource($flat),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FlatUpdateRequest $request, Flat $flat)
    {
        if ($request->user()->id !== $flat->user_id) {
            abort(403); // Return a forbidden response
        }

        //Creating empty array
        $images = [];
        //Assinging the alredy existing images in the database
        $images = $flat->images;
        if (!empty($request->images)) {
            foreach ($request->images as $image) {
                //Adding the new images to the existing images array
                array_push($images, $image);
            
                //Deleting the temporary from database
                $temporaryImage = TemporaryImage::where('file', $image)->first();
                $temporaryImage->delete();
            }
        }
        
        //Updating Flat
        $flat->update([
            'title' => $request->title,
            'description' => $request->description,
            'cost' => $request->cost,
            'deposit' => $request->deposit,
            'size' => $request->size,
            'type' => $request->type,
            'what_i_am' => $request->what_i_am,
            'furnished' => $request->furnished,
            'images' => $images,
        ]);

        $flat->amenities()->sync($request->input('amenities'));

        $flat->address()->update([
            'address_1' => $request->address_1,
            'address_2' => $request->address_2,
            'area' => $request->area,
            'city' => $request->city,
            'post_code' => $request->post_code,
            'lat' => $request->lat,
            'long' => $request->long,
            'display_name' => $request->display_name,
        ]);
       
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

        $carbonDate = Carbon::parse($request->available_from);
        $flat->availability()->update([
            'available_from' => $carbonDate->format('Y-m-d'),
            'minimum_stay' => $request->minimum_stay,
            'maximum_stay' => $request->maximum_stay,
            'days_available' => $request->days_available,
            'short_term' => $request->short_term == null ? 0 : 1,
        ]);

        return response()->json('Flat updated successfully', 201);
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
