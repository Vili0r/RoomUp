<?php

namespace App\Http\Controllers;

use App\Enums\DaysAvailable;
use App\Enums\Furnishings;
use App\Enums\MaximumStay;
use App\Enums\MinimumStay;
use App\Enums\RoomSize;
use App\Http\Requests\RoomUpdateRequest;
use Illuminate\Http\Request;
use App\Http\Resources\EnumResource;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\TemporaryImage;
use Illuminate\Support\Facades\Storage;

class RoomController extends Controller
{
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room $room): Response
    {
        if (auth()->id() !== $room->owner->user_id) {
            abort(403); // Return a forbidden response
        }

        return Inertia::render('Room/Edit',[
            'room' => new RoomResource($room),
            'roomSize' => EnumResource::collection(RoomSize::cases()),
            'furnishings' => EnumResource::collection(Furnishings::cases()),
            'daysAvailable' => EnumResource::collection(DaysAvailable::cases()),
            'minimumStay' => EnumResource::collection(MinimumStay::cases()),
            'maximumStay' => EnumResource::collection(MaximumStay::cases()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoomUpdateRequest $request, Room $room): RedirectResponse
    {
        if (auth()->id() !== $room->owner->user_id) {
            abort(403); // Return a forbidden response
        }

        $images = [];
        if($room->images != null){
            $images = $room->images;
        }

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

        $room->update([
            'sub_title' => $request->sub_title,
            'sub_description' => $request->sub_description,
            'room_size' => $request->room_size,
            'room_cost' => $request->room_cost,
            'room_deposit' => $request->room_deposit,
            'room_furnished' => $request->room_furnished,
            'room_references' => $request->room_references,
            'available_from' => $request->available_from,
            'minimum_stay' => $request->minimum_stay,
            'maximum_stay' => $request->maximum_stay,
            'days_available' => $request->days_available,
            'short_term' => $request->short_term,
            'images' => $images,
        ]);

        return to_route('shared.show', $room->owner->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        //
    }
}
