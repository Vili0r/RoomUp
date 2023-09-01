<?php

namespace App\Http\Controllers;

use App\Http\Resources\FlatSinglePropertyResource;
use App\Http\Resources\RoomSinglePropertyResource;
use App\Models\Flat;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Jobs\UserViewedFlat;
use App\Jobs\UserViewedRoom;
use App\Models\Room;

class SinglePropertyController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $model, string $id)
    {
        $property = [];
        if($model === "room"){
            $room = Room::find($id);
            $room->load(['owner.amenities', 'owner.advertiser', 'owner.address', 'owner.transport']);
            $property = new RoomSinglePropertyResource($room);

            if($request->user()) {
                dispatch(new UserViewedRoom($request->user(), $room));
            } else {
                dispatch(new UserViewedRoom(null, $room));
            } 
        } elseif ($model === "flat") {
            $flat = Flat::find($id);
            $flat->load(['amenities', 'advertiser', 'address', 'availability', 'transport']);
            $property = new FlatSinglePropertyResource($flat);

            if($request->user()) {
                dispatch(new UserViewedFlat($request->user(), $flat));
            }
        }

        if($request->wantsJson()){
            return $property;
        }

        return Inertia::render('Home/SingleProperty', [
            'property' => $property,
        ]);
    }
}
