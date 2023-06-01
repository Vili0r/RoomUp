<?php

namespace App\Http\Controllers;

use App\Http\Resources\FlatIndexResource;
use App\Http\Resources\SharedIndexResource;
use App\Models\Flat;
use App\Models\Shared;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return Inertia::render('Home/Search',[
            'flats' => FlatIndexResource::collection(Flat::latest()->paginate(15)),
            'shareds' => SharedIndexResource::collection(Shared::latest()->paginate(15)),
        ]);
    }
}
