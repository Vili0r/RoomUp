<?php

namespace App\Http\Controllers;

use App\Http\Resources\FlatResource;
use App\Http\Resources\SharedResource;
use App\Models\Shared;
use App\Models\Flat;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SinglePropertyController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $model, string $id): Response
    {
        $property = [];
        if($model === "shared"){
            $shared = Shared::withoutGlobalScope('filter_by_user')->find($id);
            $shared->load(['amenities', 'advertiser', 'address', 'transport', 'flatmate', 'rooms']);
            $property = new SharedResource($shared);
        } elseif ($model === "flat") {
            $flat = Flat::withoutGlobalScope('filter_by_user')->find($id);
            $flat->load(['amenities', 'advertiser', 'address', 'transport', 'flatmate', 'availability']);
            $property = new FlatResource($flat);
        }

        return Inertia::render('Home/SingleProperty', [
            'property' => $property,
        ]);
    }
}
