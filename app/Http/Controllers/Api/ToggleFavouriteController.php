<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ToggleFavouriteController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $model, string $id)
    {
        if ($model === "room"){
            $request->user()->favouriteRooms()->toggle([$id]);
        } elseif ($model === "flat") {
            $request->user()->favouriteFlats()->toggle([$id]);
        } elseif ($model === "roommate"){
            $request->user()->favouriteRoommates()->toggle([$id]);
        }

        return response()->noContent();
    }
}
