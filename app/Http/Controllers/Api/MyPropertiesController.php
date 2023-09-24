<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Flat;
use App\Models\Shared;
use App\Http\Resources\FlatIndexResource;
use App\Http\Resources\SharedIndexResource;

class MyPropertiesController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $flats = FlatIndexResource::collection(
            Flat::query()
                ->where('user_id', $request->user()->id)
                ->when($request->input('search'), function($query, $search) {
                    $query->where('title', 'like', "%{$search}%");
                })
                ->get()
            );
        
        $shareds = SharedIndexResource::collection(
            Shared::query()
                ->where('user_id', $request->user()->id)
                ->when($request->input('search'), function($query, $search) {
                    $query->where('title', 'like', "%{$search}%");
                })
                ->get()
            );

        $results = collect()
            ->concat($flats)
            ->concat($shareds)
            ->sortByDesc('created_at')
            ->paginate(10);

         return response()->json([
            'properties' => $results,
            'filters' => $request->only(['search'])
         ]);
    }
}
