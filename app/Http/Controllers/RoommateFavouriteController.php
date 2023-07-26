<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class RoommateFavouriteController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function store(Request $request, string $id): RedirectResponse
    {
        auth()->user()->favouriteRoommates()->toggle([$id]);

        return back();
    }
}
