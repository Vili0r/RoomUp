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
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\AmenitiesResource;
use App\Http\Resources\EnumResource;
use App\Http\Resources\SharedIndexResource;
use App\Http\Resources\SharedResource;
use App\Http\Resources\SharedShowResource;
use App\Models\Amenity;
use App\Models\Room;
use App\Models\Shared;
use App\Models\TemporaryImage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SharedController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {      
        return Inertia::render('Shared/Index',[
            'shareds' => SharedIndexResource::collection(
                Shared::query()
                    ->where('user_id', auth()->id())
                    ->when($request->input('search'), function($query, $search) {
                        $query->where('title', 'like', "%{$search}%");
                    })
                    ->latest()
                    ->paginate(10)
                    ->withQueryString()
                ),
                'filters' => $request->only(['search'])
         ]);
    }

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
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
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
        ]);

        $data = $request->validate([
            'title' => ['required', 'min:4', 'max:30'],
            'description' => ['required', 'min:50', 'max:1000'],
            'available_rooms' => ['required', 'numeric'],
            'size' => ['required'],
            'type' => ['required'],
            'current_occupants' => ['required'],
            'what_i_am' => ['required'],
            'user_id' => ['sometimes'],
            'live_at' => ['sometimes'],
            'featured' => ['sometimes'],
            'available' => ['sometimes'],
            'current_flatmate_age' => ['sometimes'],
            'current_flatmate_smoker' => ['sometimes'],
            'current_flatmate_pets' => ['sometimes'],
            'current_flatmate_occupation' => ['sometimes'],
            'current_flatmate_gender' => ['sometimes'],
            'current_flatmate_hobbies' => ['sometimes'],
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

        $shared = auth()->user()->shareds()->create($data);

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

        return to_route('dashboard');
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
            'shared' => new SharedResource($shared),
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
    public function update(Request $request, Shared $shared): RedirectResponse
    {
        if (auth()->id() !== $shared->user_id) {
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
            'title' => ['required', 'min:10', 'max:50'],
            'description' => ['required', 'min:50', 'max:500'],
            'available_rooms' => [
                'required', 
                'numeric', 
                function ($attribute, $value, $fail) use ($request) {
                $difference = $request->input('size') - $request->input('current_occupants');
                if ($value > $difference) {
                    $fail('Available rooms must be smaller than the difference between Size and Current tenanats.');
                }},
            ],
            'size' => ['required', 'gte:available_rooms'],
            'type' => ['required'],
            'current_occupants' => ['required', 'lte:size'],
            'what_i_am' => ['required'],
            'user_id' => ['sometimes'],
            'live_at' => ['sometimes'],
            'featured' => ['sometimes'],
            'available' => ['sometimes'],
            'current_flatmate_age' => [
                'required_if:current_occupants,>=,1', 
                function ($attribute, $value, $fail) use ($request) {
                    $otherFieldValue = $request->input('current_occupants');
    
                    if ($otherFieldValue >= 1 && !is_numeric($value)) {
                        $fail("The $attribute field must be numeric.");
                    }
                },
                function ($attribute, $value, $fail) use ($request) {
                    $otherFieldValue = $request->input('current_occupants');
    
                    if ($otherFieldValue >= 1 && $value >= 18) {
                        $fail("The $attribute field must be at least 18.");
                    }
                },
            ],
            'current_flatmate_smoker' => ['required_if:current_occupants,>=,1'],
            'current_flatmate_pets' => ['required_if:current_occupants,>=,1'],
            'current_flatmate_occupation' => ['required_if:current_occupants,>=,1'],
            'current_flatmate_gender' => ['required_if:current_occupants,>=,1'],
            'current_flatmate_hobbies' => ['sometimes'],
            'images' => ['sometimes', 'max:9'],
            'amenities' => ['required'],
            'rooms' => ['required', 'array'],
            'rooms.*' => ['array'],
            'rooms.*.room_cost' => ['required'],
            'rooms.*.room_deposit' => ['required'],
            'rooms.*.room_furnished' => ['required'],
            'rooms.*.room_references' => ['sometimes'],
            'rooms.*.room_size' => ['required'],
            'rooms.*.available_from' => ['required', 'after:tomorrow'],
            'rooms.*.days_available' => ['required'],
            'rooms.*.maximum_stay' => ['required','gt:rooms.*.minimum_stay'],
            'rooms.*.minimum_stay' => ['required'],
            'rooms.*.short_term' => ['sometimes'],
        ],[
            'rooms.*.room_cost.required' => 'The room cost field in Room :position is required',
            'rooms.*.room_deposit.required' => 'The room deposit field in Room :position is required',
            'rooms.*.room_furnished.required' => 'The room furnished field in Room :position is required',
            'rooms.*.room_size.required' => 'The room size field in Room :position is required',
            'rooms.*.available_from.required' => 'The available from field in Room :position is required',
            'rooms.*.days_available.required' => 'The days available field in Room :position is required',
            'rooms.*.maximum_stay.required' => 'The maximum stay field in Room :position is required',
            'rooms.*.minimum_stay.required' => 'The minimum stay field in Room :position is required',
            'current_flatmate_age.required' => 'The current flatmate age field is required',
            'current_flatmate_age.numeric' => 'This does not appear to be a number',
            'current_flatmate_age.before' => 'Current flatmate should be more than 18 years old',
            'current_flatmate_smoker.required' => 'The current flatmate smoker field is required',
            'current_flatmate_pets.required' => 'The current flatmate pets field is required',
            'current_flatmate_occupation.required' => 'The current flatmate occupation field is required',
            'current_flatmate_gender.required' => 'The current flatmate gender field is required',
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
            'size.after' => 'The :attribute must be greater than the available rooms',
            'post_code.required' => 'The post code field is required',
            'address_1.required' => 'The address field is required',
            'available_rooms.required' => 'The available rooms field is required',
            'available_rooms.numeric' => 'This does not appear to be a number',
            'what_i_am.required' => 'Your current status field is required',
            'first_name.required' => 'The first name field is required',
            'last_name.required' => 'The last name field is required',
            'current_occupants.required' => 'The current occupants field is required',
            'current_occupants.lt' => 'The current occupants must be smaller than the size',
        ]);

        $data = $request->validate([
            'title' => ['required', 'min:10', 'max:50'],
            'description' => ['required', 'min:50', 'max:500'],
            'available_rooms' => ['required', 'numeric'],
            'size' => ['required'],
            'type' => ['required'],
            'current_occupants' => ['required'],
            'what_i_am' => ['required'],
            'user_id' => ['sometimes'],
            'live_at' => ['sometimes'],
            'featured' => ['sometimes'],
            'available' => ['sometimes'],
            'current_flatmate_age' => ['sometimes'],
            'current_flatmate_smoker' => ['sometimes'],
            'current_flatmate_pets' => ['sometimes'],
            'current_flatmate_occupation' => ['sometimes'],
            'current_flatmate_gender' => ['sometimes'],
            'current_flatmate_hobbies' => ['sometimes'],
            'images' => ['sometimes'],
        ]);

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
        //dd($images);

        //Assigning the images to data['images']
        $data['images'] = $images;
        
        //Updating shared
        $shared->update($data);

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
