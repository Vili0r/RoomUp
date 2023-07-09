<?php

namespace App\Http\Controllers;

use App\Http\Resources\FlatIndexResource;
use App\Http\Resources\SharedIndexResource;
use Inertia\Response;
use App\Models\Flat;
use App\Models\Shared;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $flats = FlatIndexResource::collection(
            Flat::query()
                ->where('user_id', auth()->id())
                ->when($request->input('search'), function($query, $search) {
                    $query->where('title', 'like', "%{$search}%");
                })
                ->get()
            );
        
        $shareds = SharedIndexResource::collection(
            Shared::query()
                ->where('user_id', auth()->id())
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
        
        return Inertia::render('Properties/Index', [
            'properties' => $results,
            'filters' => $request->only(['search'])
        ]);
    }
}
