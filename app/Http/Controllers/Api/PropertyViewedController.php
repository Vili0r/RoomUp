<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PropertyViewedController extends Controller
{
    const INDEX_LIMIT = 10;
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $flats = $request->user()->viewedFlats()->with(['address', 'advertiser', 'viewedUsers', 'favourites', 'availability'])->orderByPivot('updated_at', 'desc')->get()->map(fn($flat) => [
            'id' => $flat->id,
            'model' => 'flat',
            'title' => $flat->title,
            'cost' => $flat->cost,
            'images' => $flat->images,
            'favouritedBy' => $flat->favouritedBy($request->user()),
            'address_1' => $flat->address->address_1,
            'area' => $flat->address->area,
            'available_from' => $flat->availability->available_from,
            'first_name' => $flat->advertiser->first_name,
            'views' => $flat->views(),
        ]);

        $rooms = $request->user()->viewedRooms()->with(['owner.address', 'owner.advertiser', 'viewedUsers', 'favourites'])->orderByPivot('updated_at', 'desc')->get()->map(fn($room) => [
            'id' => $room->id,
            'model' => 'room',
            'title' => $room->sub_title ? $room->sub_title : $room->owner->title,
            'available_from' => $room->available_from,
            'cost' => $room->room_cost,
            'images' => $room->images !== null ? array_merge($room->owner->images, $room->images) : $room->owner->images,
            'favouritedBy' => $room->favouritedBy($request->user()),
            'address_1' => $room->owner->address->address_1,
            'area' => $room->owner->address->area,
            'first_name' => $room->owner->advertiser->first_name,
            'views' => $room->views(),
        ]);

        $roommates = $request->user()->favouriteRoommates()->with(['advertiser', 'viewedUsers', 'favourites', 'availability'])->get()->map(fn($roommate) => [
            'id' => $roommate->id,
            'model' => 'roommate',
            'title' => $roommate->title,
            'cost' => $roommate->budget,
            'images' => $roommate->images,
            'favouritedBy' => $roommate->favouritedBy($request->user()),
            'address_1' => $roommate->city,
            'area' => $roommate->area,
            'first_name' => $roommate->advertiser->first_name,
            'available_from' => $roommate->availability->available_from,
            'views' => $roommate->views(),
        ]);

        $properties = collect()
            ->merge($flats)
            ->merge($rooms)
            ->merge($roommates)
            ->sortByDesc('updated_at')
            ->values()
            ->take(self::INDEX_LIMIT);

        return $properties;
    }
}
