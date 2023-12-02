<?php

namespace App\Http\Controllers;

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
use App\Enums\Size;
use App\Enums\Stations;
use App\Enums\Type;
use App\Enums\WhatIAmFlat;
use App\Http\Requests\FlatStoreRequest;
use App\Http\Requests\FlatUpdateRequest;
use App\Http\Resources\EnumResource;
use App\Http\Resources\AmenitiesResource;
use App\Http\Resources\FlatResource;
use App\Http\Resources\FlatShowResource;
use App\Models\Amenity;
use App\Models\Flat;
use App\Models\TemporaryImage;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class FlatController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render("Flat/Create", [
            'whatIAmFlat' => EnumResource::collection(WhatIAmFlat::cases()),
            'size' => EnumResource::collection(Size::cases()),
            'type' => EnumResource::collection(Type::cases()),
            'minutes' => EnumResource::collection(Minutes::cases()),
            'mode' => EnumResource::collection(Mode::cases()),
            'stations' => EnumResource::collection(Stations::cases()),
            'amenities' => AmenitiesResource::collection(Amenity::all()),
            'furnishings' => EnumResource::collection(Furnishings::cases()),
            'daysAvailable' => EnumResource::collection(DaysAvailable::cases()),
            'minimumStay' => EnumResource::collection(MinimumStay::cases()),
            'maximumStay' => EnumResource::collection(MaximumStay::cases()),
            'newFlatmateSmoking' => EnumResource::collection(NewFlatmateSmoking::cases()),
            'newFlatmateGender' => EnumResource::collection(NewFlatmateGender::cases()),
            'newFlatmateOccupation' => EnumResource::collection(NewFlatmateOccupation::cases()),
            'pets' => EnumResource::collection(Pets::cases()),
            'references' => EnumResource::collection(References::cases()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FlatStoreRequest $request): RedirectResponse
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

        $flat->amenities()->attach($request->input('amenities.*.id'));
        
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

        $flat->availability()->create([
            'available_from' => $request->available_from,
            'minimum_stay' => $request->minimum_stay,
            'maximum_stay' => $request->maximum_stay,
            'days_available' => $request->days_available,
            'short_term' => $request->short_term == null ? 0 : 1,
        ]);

        return to_route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(Flat $flat): Response
    {
        if (auth()->id() !== $flat->user_id) {
            abort(403); // Return a forbidden response
        }

        $flat->load(['address']);

        return Inertia::render("Flat/Show", [
            'flat' => new FlatShowResource($flat),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Flat $flat): Response
    {
        if (auth()->id() !== $flat->user_id) {
            abort(403); // Return a forbidden response
        }

        $flat->load(['amenities', 'advertiser', 'address', 'transport', 'flatmate', 'availability']);

        return Inertia::render("Flat/Edit", [
            'flat' => new FlatResource($flat),
            'whatIAmFlat' => EnumResource::collection(WhatIAmFlat::cases()),
            'size' => EnumResource::collection(Size::cases()),
            'type' => EnumResource::collection(Type::cases()),
            'minutes' => EnumResource::collection(Minutes::cases()),
            'mode' => EnumResource::collection(Mode::cases()),
            'stations' => EnumResource::collection(Stations::cases()),
            'amenities' => AmenitiesResource::collection(Amenity::all()),
            'furnishings' => EnumResource::collection(Furnishings::cases()),
            'daysAvailable' => EnumResource::collection(DaysAvailable::cases()),
            'minimumStay' => EnumResource::collection(MinimumStay::cases()),
            'maximumStay' => EnumResource::collection(MaximumStay::cases()),
            'newFlatmateSmoking' => EnumResource::collection(NewFlatmateSmoking::cases()),
            'newFlatmateGender' => EnumResource::collection(NewFlatmateGender::cases()),
            'newFlatmateOccupation' => EnumResource::collection(NewFlatmateOccupation::cases()),
            'pets' => EnumResource::collection(Pets::cases()),
            'references' => EnumResource::collection(References::cases()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FlatUpdateRequest $request, Flat $flat): RedirectResponse
    {
        if (auth()->id() !== $flat->user_id) {
            abort(403); // Return a forbidden response
        }
       
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

        return to_route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Flat $flat): RedirectResponse
    {
        if (auth()->id() !== $flat->user_id) {
            abort(403); // Return a forbidden response
        }

        // DB::transaction(function () {
        //     $project->tasks()->delete();
        //     $project->delete();
        // });
        
        Storage::delete($flat->images);
        $flat->delete();

        return to_route("dashboard");
    }
}
