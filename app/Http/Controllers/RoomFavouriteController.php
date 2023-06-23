<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class RoomFavouriteController extends Controller
{
    public function store(Request $request, string $id): RedirectResponse
    {
        auth()->user()->favouriteRooms()->toggle([$id]);

        return back();
    }
}
