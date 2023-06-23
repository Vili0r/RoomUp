<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Collection;

class FavouriteIndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $shareds = auth()->user()->favouriteShareds()->paginate(10)->getCollection();
        $flats = auth()->user()->favouriteFlats()->paginate(10)->getCollection();
        //dd($shareds, $flats);

        // $properties = new Collection();
        // $properties->merge($shareds);
        // $properties->merge($flats);

        return Inertia::render('Favourites/Index', [
            'shareds' => $shareds,
            'flats' => $flats
        ]);
    }
}
