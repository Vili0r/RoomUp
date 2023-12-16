<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomUpdateRequest;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use App\Models\TemporaryImage;
use Carbon\Carbon;
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
    public function update(RoomUpdateRequest $request, Room $room)
    {
        if ($request->user()->id !== $room->owner->user_id) {
            abort(403); // Return a forbidden response
        }

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
        
        $carbonDate = Carbon::parse($request->available_from);

        $room->update([
            'sub_title' => $request->sub_title,
            'sub_description' => $request->sub_description,
            'room_size' => $request->room_size,
            'room_cost' => $request->room_cost,
            'room_deposit' => $request->room_deposit,
            'room_furnished' => $request->room_furnished,
            'room_references' => $request->room_references,
            'available_from' => $carbonDate->format('Y-m-d'),
            'minimum_stay' => $request->minimum_stay,
            'maximum_stay' => $request->maximum_stay,
            'days_available' => $request->days_available,
            'short_term' => $request->short_term,
            'images' => $images,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        //
    }
}
