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
            'description' => $flat->description,
            'favouritedBy' => $flat->favouritedBy(auth()->user()),
            'created_at' => $flat->created_at->toDateTimeString(),
            'updated_at' => $flat->pivot->updated_at->toDateTimeString(),
            'address' => $flat->address,
            'advertiser' => $flat->advertiser,
            'views' => $flat->views(),
        ]);

        $shareds = $request->user()->viewedShareds()->with(['address', 'advertiser', 'viewedUsers'])->orderByPivot('updated_at', 'desc')->get()->map(fn($shared) => [
            'id' => $shared->id,
            'model' => 'shared',
            'title' => $shared->title,
            'description' => $shared->description,
            'images' => $shared->images,
            'size' => $shared->size,
            'type' => Str::replace('_', ' ', $shared->type->name) ?? '',
            'favouritedBy' => $shared->favouritedBy(auth()->user()),
            'created_at' => $shared->created_at->toDateTimeString(),
            'updated_at' => $shared->pivot->updated_at->toDateTimeString(),
            'address' => $shared->address,
            'advertiser' => $shared->advertiser,
            'views' => $shared->views(),
        ]);

        $properties = collect()
            ->merge($flats)
            ->merge($shareds)
            ->sortByDesc('updated_at')
            ->values()
            ->take(self::INDEX_LIMIT);

        return Inertia::render('Viewed/RecentlyViewed', [
            'properties' => $properties,
            'indexLimit' => self::INDEX_LIMIT,
        ]);
    }
}
