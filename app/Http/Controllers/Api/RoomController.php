<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use App\Models\TemporaryImage;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Room $room)
    {
        if ($request->user()->id !== $room->owner->user_id) {
            abort(403); // Return a forbidden response
        }

        return response()->json([
            'room' => new RoomResource($room),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room)
    {
        if ($request->user()->id !== $room->owner->user_id) {
            abort(403); // Return a forbidden response
        }

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
            'images' => ['sometimes'],
        ]);

        $images = [];
        if($room->images != null){
            $images = $room->images;
        }

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

        $room->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        //
    }
}
