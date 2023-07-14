<?php

namespace App\Http\Controllers;

use App\Http\Resources\AddressSearchResultResource;
use App\Http\Resources\FlatSearchResultResource;
use App\Http\Resources\RoomSearchResultResource;
use App\Http\Resources\RoomShowResource;
use App\Models\Address;
use App\Models\Flat;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;
use App\Models\Shared;

class HomeSearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $roomQuery = null;
        $flatQuery = null;
        
        $roomQuery = RoomShowResource::collection(
                QueryBuilder::for(Room::class)
                    ->with(['owner.address'])
                    ->tap(function ($builder) use ($request) {
                        if(filled($request->search)){
                            return $builder->whereIn('id', Room::search($request->search)->get()->pluck('id'));
                        }
                    })
                    ->get()
                );
        
        $flatQuery = FlatSearchResultResource::collection(
                QueryBuilder::for(Flat::class)
                    ->with(['address', 'availability'])
                    ->tap(function ($builder) use ($request) {
                        if(filled($request->search)){
                            return $builder->whereIn('id', Flat::search($request->search)->get()->pluck('id'));
                        }
                    })
                    ->get()
                );

        $properties = $roomQuery
            ->concat($flatQuery)
            ->sortByDesc('created_at')
            ->paginate(4)
            ->appends($request->query());

        return Inertia::render('Home/HomeSearch',[
            'selectedQueries' => $request->only(['search']),
            'properties' => $properties,
            'loading' => false,
        ]);
    }
}
