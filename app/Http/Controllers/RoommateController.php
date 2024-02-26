<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoommateStoreRequest;
use App\Http\Requests\RoommateUpdateRequest;
use App\Http\Resources\Roommate\RoommateEditResource;
use App\Http\Resources\Roommate\RoommateIndexResource;
use App\Http\Resources\Roommate\RoommateShowResource;
use App\Models\Roommate;
use App\Models\TemporaryImage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class RoommateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Roommate/Index', [
            'roommates' => RoommateIndexResource::collection(
                Roommate::where('user_id', auth()->id())   
                        ->latest()
                        ->paginate()
                )
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Roommate/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoommateStoreRequest $request): RedirectResponse
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

        $roommate->amenities()->attach($request->input('amenities.*.id'));
        $roommate->hobbies()->attach($request->input('hobbies.*.id'));

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

        $roommate->availability()->create([
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
    public function show(Roommate $roommate): Response
    {
        if (auth()->id() !== $roommate->user_id) {
            abort(403); // Return a forbidden response
        }

        return Inertia::render("Roommate/Show", [
            'roommate' => new RoommateShowResource($roommate),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Roommate $roommate): Response
    {
        if (auth()->id() !== $roommate->user_id) {
            abort(403); // Return a forbidden response
        }

        $roommate->load(['availability', 'flatmate', 'advertiser', 'amenities', 'hobbies']);

        return Inertia::render('Roommate/Edit', [
            'roommate' => new RoommateEditResource($roommate),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoommateUpdateRequest $request, Roommate $roommate): RedirectResponse
    {
        if (auth()->id() !== $roommate->user_id) {
            abort(403); // Return a forbidden response
        }

        //Creating empty array
        $images = [];
        //Assinging the alredy existing images in the database
        $images = $roommate->images;
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

        $roommate->amenities()->sync($request->input('amenities.*.id'));
        $roommate->hobbies()->sync($request->input('hobbies.*.id'));
       
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

        $roommate->availability()->update([
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
    public function destroy(Roommate $roommate): RedirectResponse
    {
        if (auth()->id() !== $roommate->user_id) {
            abort(403); // Return a forbidden response
        }

        // DB::transaction(function () {
        //     $project->tasks()->delete();
        //     $project->delete();
        // });
        
        Storage::delete($roommate->images);
        $roommate->delete();
        return to_route('dashboard');
    }
}
