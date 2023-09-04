<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FlatSearchResultResource;
use App\Http\Resources\RoomSearchResultResource;
use App\Models\Flat;
use App\Models\Room;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class SearchController extends Controller
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
                        return $builder->whereIn('id', Room::search($request->search)->get()->pluck('id'));
                    })
                    ->get()
                );
        
        $flatQuery = FlatSearchResultResource::collection(
                QueryBuilder::for(Flat::class)
                    ->with(['address', 'availability', 'favourites', 'viewedUsers'])
                    ->tap(function ($builder) use ($request) {
                        return $builder->whereIn('id', Flat::search($request->search)->get()->pluck('id'));
                    })
                    ->get()
                );

        $properties = $roomQuery
            ->concat($flatQuery)
            ->sortByDesc('created_at')
            ->paginate(4)
            ->appends($request->query());

      
        return $properties;
    }
}
