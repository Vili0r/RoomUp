<?php

namespace App\Http\Controllers;

use App\Enums\CurrentFlatmateGender;
use App\Enums\CurrentFlatmateOccupation;
use App\Enums\CurrentFlatmateSmoking;
use App\Enums\DaysAvailable;
use App\Enums\MaximumStay;
use App\Enums\MinimumStay;
use App\Enums\NewFlatmateGender;
use App\Enums\NewFlatmateOccupation;
use App\Enums\NewFlatmateSmoking;
use App\Enums\Pets;
use App\Enums\SearchingFor;
use Illuminate\Http\Request;
use App\Http\Resources\AmenitiesResource;
use App\Http\Resources\EnumResource;
use App\Http\Resources\HobbiesResource;
use App\Http\Resources\Quest\QuestIndexResource;
use App\Models\Amenity;
use App\Models\Hobby;
use App\Models\RoomWanted;
use App\Models\TemporaryImage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class RoomWantedController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('RoomWanted/Index', [
            'quest' => QuestIndexResource::collection(
                RoomWanted::where('user_id', auth()->id())   
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
        return Inertia::render('RoomWanted/Create', [
            'amenities' => AmenitiesResource::collection(Amenity::all()),
            'hobbies' => HobbiesResource::collection(Hobby::all()),
            'daysAvailable' => EnumResource::collection(DaysAvailable::cases()),
            'searchingFor' => EnumResource::collection(SearchingFor::cases()),
            'minimumStay' => EnumResource::collection(MinimumStay::cases()),
            'maximumStay' => EnumResource::collection(MaximumStay::cases()),
            'newFlatmateSmoking' => EnumResource::collection(NewFlatmateSmoking::cases()),
            'smoking' => EnumResource::collection(CurrentFlatmateSmoking::cases()),
            'newFlatmateGender' => EnumResource::collection(NewFlatmateGender::cases()),
            'gender' => EnumResource::collection(CurrentFlatmateGender::cases()),
            'newFlatmateOccupation' => EnumResource::collection(NewFlatmateOccupation::cases()),
            'occupation' => EnumResource::collection(CurrentFlatmateOccupation::cases()),
            'pets' => EnumResource::collection(Pets::cases()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
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
            'user_id' => ['sometimes'],
            'live_at' => ['sometimes'],
            'available' => ['sometimes'],
            'age' => ['required'],
            'smoker' => ['required'],
            'pets' => ['required'],
            'occupation' => ['required'],
            'gender' => ['required'],
            'second_gender' => ['sometimes'],
            'hobbies' => ['required', 'array', 'min:1', 'max:15'],
            'amenities' => ['required', 'array', 'min:1'],
            'area' => ['required'],
            'city' => ['required'],
            'images' => ['required', 'array'],
        ]);
       
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
        $data['images'] = $images;

        $quest = auth()->user()->roomWanteds()->create($data);

        $quest->amenities()->attach($request->input('amenities.*.id'));
        $quest->hobbies()->attach($request->input('hobbies.*.id'));

        $quest->advertiser()->create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'display_last_name' => $request->display_last_name == null ? 0 : 1,
            'telephone' => $request->telephone,
            'display_telephone' => $request->display_telephone == null ? 0 : 1,
        ]);
        
        $quest->flatmate()->create([
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

        $quest->availability()->create([
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
    public function show(RoomWanted $roomWanted): Response
    {
        if (auth()->id() !== $roomWanted->user_id) {
            abort(403); // Return a forbidden response
        }

        //$roomWanted->load(['address']);

        return Inertia::render("Flat/Show", [
            'quest' => $roomWanted,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RoomWanted $roomWanted): Response
    {
        if (auth()->id() !== $roomWanted->user_id) {
            abort(403); // Return a forbidden response
        }

        return Inertia::render('RoomWanted/Edit', [
            'quests' => $roomWanted,
            'amenities' => AmenitiesResource::collection(Amenity::all()),
            'hobbies' => HobbiesResource::collection(Hobby::all()),
            'daysAvailable' => EnumResource::collection(DaysAvailable::cases()),
            'searchingFor' => EnumResource::collection(SearchingFor::cases()),
            'minimumStay' => EnumResource::collection(MinimumStay::cases()),
            'maximumStay' => EnumResource::collection(MaximumStay::cases()),
            'newFlatmateSmoking' => EnumResource::collection(NewFlatmateSmoking::cases()),
            'smoking' => EnumResource::collection(CurrentFlatmateSmoking::cases()),
            'newFlatmateGender' => EnumResource::collection(NewFlatmateGender::cases()),
            'gender' => EnumResource::collection(CurrentFlatmateGender::cases()),
            'newFlatmateOccupation' => EnumResource::collection(NewFlatmateOccupation::cases()),
            'occupation' => EnumResource::collection(CurrentFlatmateOccupation::cases()),
            'pets' => EnumResource::collection(Pets::cases()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RoomWanted $roomWanted): RedirectResponse
    {
        if (auth()->id() !== $roomWanted->user_id) {
            abort(403); // Return a forbidden response
        }

        //Creating empty array
        $images = [];
        //Assinging the alredy existing images in the database
        $images = $roomWanted->images;
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

        $roomWanted->update($data);

        $roomWanted->amenities()->sync($request->input('amenities.*.id'));
       
        $roomWanted->advertiser()->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'display_last_name' => $request->display_last_name == null ? 0 : 1,
            'telephone' => $request->telephone,
            'display_telephone' => $request->display_telephone == null ? 0 : 1,
        ]);
        
        $roomWanted->flatmate()->update([
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

        $roomWanted->availability()->update([
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
    public function destroy(RoomWanted $roomWanted): RedirectResponse
    {
        if (auth()->id() !== $roomWanted->user_id) {
            abort(403); // Return a forbidden response
        }

        // DB::transaction(function () {
        //     $project->tasks()->delete();
        //     $project->delete();
        // });
        
        Storage::delete($roomWanted->images);
        $roomWanted->delete();
        return to_route('dashboard');
    }
}
