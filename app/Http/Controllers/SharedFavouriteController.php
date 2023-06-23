<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class SharedFavouriteController extends Controller
{
    public function store(Request $request, string $id): RedirectResponse
    {
        auth()->user()->favouriteShareds()->toggle([$id]);

        return back();
    }
}
