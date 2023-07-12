<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class PropertyViewedController extends Controller
{
    const INDEX_LIMIT = 10;
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $flats = $request->user()->viewedFlats()->with(['address', 'advertiser', 'viewedUsers'])->orderByPivot('updated_at', 'desc')->get()->map(fn($flat) => [
            'id' => $flat->id,
            'model' => 'flat',
            'title' => $flat->title,
            'size' => $flat->size,
            'type' => Str::replace('_', ' ', $flat->type->name) ?? '',
            'images' => $flat->images,
            'description' => substr($flat->description, 0, 250) . '...',
            'favouritedBy' => $flat->favouritedBy(auth()->user()),
            'created_at' => $flat->created_at->toDateTimeString(),
            'updated_at' => $flat->pivot->updated_at->toDateTimeString(),
            'address' => $flat->address,
            'advertiser' => $flat->advertiser,
            'views' => $flat->views(),
        ]);

        $rooms = $request->user()->viewedRooms()->with(['owner.address', 'owner.advertiser', 'viewedUsers'])->orderByPivot('updated_at', 'desc')->get()->map(fn($room) => [
            'id' => $room->id,
            'model' => 'room',
            'title' => $room->sub_title,
            'description' => substr($room->sub_description, 0, 250) . '...',
            'images' => $room->images !== null ? array_merge($room->owner->images, $room->images) : $room->owner->images,
            'size' => $room->owner->size,
            'type' => Str::replace('_', ' ', $room->owner->type->name) ?? '',
            'favouritedBy' => $room->favouritedBy(auth()->user()),
            'created_at' => $room->created_at->toDateTimeString(),
            'updated_at' => $room->pivot->updated_at->toDateTimeString(),
            'address' => $room->owner->address,
            'advertiser' => $room->owner->advertiser,
            'views' => $room->views(),
        ]);

        $properties = collect()
            ->merge($flats)
            ->merge($rooms)
            ->sortByDesc('updated_at')
            ->values()
            ->take(self::INDEX_LIMIT);

        return Inertia::render('Viewed/RecentlyViewed', [
            'properties' => $properties,
            'indexLimit' => self::INDEX_LIMIT,
        ]);
    }
}
