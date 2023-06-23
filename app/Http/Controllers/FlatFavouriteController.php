<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class FlatFavouriteController extends Controller
{
    public function store(Request $request, string $id): RedirectResponse
    {
        auth()->user()->favouriteFlats()->toggle([$id]);

        return back();
    }
}
