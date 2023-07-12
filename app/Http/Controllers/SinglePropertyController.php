<?php

namespace App\Http\Controllers;

use App\Http\Resources\FlatResource;
use App\Http\Resources\RoomShowResource;
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
    public function __invoke(Request $request, string $model, string $id): Response
    {
        $property = [];
        if($model === "room"){
            $room = Room::find($id);
            $room->load(['owner.amenities', 'owner.advertiser', 'owner.address', 'owner.transport', 'owner.flatmate']);
            $property = new RoomShowResource($room);

            if($request->user()) {
                dispatch(new UserViewedRoom($request->user(), $room));
            }
        } elseif ($model === "flat") {
            $flat = Flat::find($id);
            $flat->load(['amenities', 'advertiser', 'address', 'transport', 'flatmate', 'availability']);
            $property = new FlatResource($flat);

            if($request->user()) {
                dispatch(new UserViewedFlat($request->user(), $flat));
            }
        }

        return Inertia::render('Home/SingleProperty', [
            'property' => $property,
        ]);
    }
}
