<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class FavouriteIndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $flats = $request->user()->favouriteFlats()->with(['address', 'advertiser'])->get()->map(fn($flat) => [
            'id' => $flat->id,
            'model' => 'flat',
            'title' => $flat->title,
            'size' => $flat->size,
            'type' => Str::replace('_', ' ', $flat->type->name) ?? '',
            'images' => $flat->images,
            'description' => substr($flat->description, 0, 250) . '...',
            'favouritedBy' => $flat->favouritedBy(auth()->user()),
            'created_at' => $flat->created_at->toDateTimeString(),
            'address' => $flat->address,
            'advertiser' => $flat->advertiser,
        ]);
        
        $rooms = $request->user()->favouriteRooms()->with(['owner.address', 'owner.advertiser'])->get()->map(fn($room) => [
            'id' => $room->id,
            'model' => 'room',
            'title' => $room->title,
            'sub_title' => $room->title,
            'description' => substr($room->sub_description, 0, 250) . '...',
            'images' => $room->images !== null ? array_merge($room->owner->images, $room->images) : $room->owner->images,
            'size' => $room->owner->size,
            'type' => Str::replace('_', ' ', $room->owner->type->name) ?? '',
            'favouritedBy' => $room->favouritedBy(auth()->user()),
            'created_at' => $room->created_at->toDateTimeString(),
            'address' => $room->owner->address,
            'advertiser' => $room->owner->advertiser,
        ]);

        $properties = collect()->merge($flats)->merge($rooms)->sortByDesc('created_at')->values()->paginate(3);
        
        return Inertia::render('Favourites/Index', [
            'properties' => $properties
        ]);
    }
}
