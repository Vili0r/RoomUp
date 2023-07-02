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
        
        $shareds = $request->user()->favouriteShareds()->with(['address', 'advertiser'])->get()->map(fn($shared) => [
            'id' => $shared->id,
            'model' => 'shared',
            'title' => $shared->title,
            'description' => substr($shared->description, 0, 250) . '...',
            'images' => $shared->images,
            'size' => $shared->size,
            'type' => Str::replace('_', ' ', $shared->type->name) ?? '',
            'favouritedBy' => $shared->favouritedBy(auth()->user()),
            'created_at' => $shared->created_at->toDateTimeString(),
            'address' => $shared->address,
            'advertiser' => $shared->advertiser,
        ]);

        $properties = collect()->merge($flats)->merge($shareds)->sortByDesc('created_at')->values();
        
        return Inertia::render('Favourites/Index', [
            'properties' => $properties
        ]);
    }
}
