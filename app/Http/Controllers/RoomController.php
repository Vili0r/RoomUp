<?php

namespace App\Http\Controllers;

use App\Enums\DaysAvailable;
use App\Enums\Furnishings;
use App\Enums\MaximumStay;
use App\Enums\MinimumStay;
use App\Enums\RoomSize;
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
    public function update(Request $request, Room $room): RedirectResponse
    {
        if (auth()->id() !== $room->owner->user_id) {
            abort(403); // Return a forbidden response
        }
        //dd($request);

        $data = $request->validate([
            'sub_title' => ['required', 'min:10', 'max:25'],
            'sub_description' => ['required', 'min:50', 'max:250'],
            'room_size' => ['required'],
            'room_cost' => ['required'],
            'room_deposit' => ['required'],
            'room_furnished' => ['required'],
            'room_references' => ['sometimes'],
            'available_from' => ['required', 'after:tomorrow'],
            'minimum_stay' => ['required'],
            'maximum_stay' => ['required','gt:minimum_stay'],
            'days_available' => ['required'],
            'short_term' => ['sometimes'],
            'images' => ['sometimes', 'max:9'],
        ]);

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
        $data['images'] = $images;

        $room->update($data);

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
