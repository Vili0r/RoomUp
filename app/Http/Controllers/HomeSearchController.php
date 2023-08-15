<?php

namespace App\Http\Controllers;

use App\Http\Resources\FlatSearchResultResource;
use App\Http\Resources\RoomSearchResultResource;
use App\Models\Flat;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class HomeSearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $roomQuery = null;
        $flatQuery = null;
        
        $roomQuery = RoomSearchResultResource::collection(
                QueryBuilder::for(Room::class)
                    ->with(['owner.address', 'favourites', 'viewedUsers'])
                    ->tap(function ($builder) use ($request) {
                        if(filled($request->search)){
                            return $builder->whereIn('id', Room::search($request->search)->get()->pluck('id'));
                        }
                    })
                    ->get()
                );
        
        $flatQuery = FlatSearchResultResource::collection(
                QueryBuilder::for(Flat::class)
                    ->with(['address', 'availability', 'favourites', 'viewedUsers'])
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

        if($request->wantsJson()){
            return $properties;
        }

        return Inertia::render('Home/HomeSearch',[
            'selectedQueries' => $request->only(['search']),
            'properties' => $properties,
        ]);
    }
}
