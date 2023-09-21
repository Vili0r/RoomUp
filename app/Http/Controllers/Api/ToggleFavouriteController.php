<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
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
            $request->user()->favouriteShareds()->toggle([$id]);
        }

        return response()->noContent();
    }
}
