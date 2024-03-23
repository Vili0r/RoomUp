<?php

namespace App\Http\Controllers;

use App\Http\Resources\FlatSearchResultResource;
use App\Http\Resources\Roommate\RoommateSearchResource;
use App\Http\Resources\RoomSearchResultResource;
use App\Models\Flat;
use App\Models\Room;
use App\Models\Roommate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;

class HomeSearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $roomQuery = null;
        $flatQuery = null;
        $query = null;
        $properties = [];
        $searchType = $request->input('search_type', 'rent');
      
        if ($searchType === 'rent') {
            $roomQuery = RoomSearchResultResource::collection(
                QueryBuilder::for(Room::class)
                    ->allowedFilters($this->allowedRentFilters())
                    ->with(['owner.address', 'favourites', 'viewedUsers'])
                    ->tap(function ($builder) use ($request) {  
                        return $builder->whereIn('id', Room::search($request->search)->get()->pluck('id'));
                    })
                    ->get()
                );
        
            $flatQuery = FlatSearchResultResource::collection(
                QueryBuilder::for(Flat::class)
                    ->allowedFilters($this->allowedRentFilters())
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

            if($request->wantsJson()){
                return $properties;
            }
    
            return Inertia::render('Home/HomeSearch',[
                'selectedQueries' => $request->only(['search']),
                'properties' => $properties,
            ]);

        } elseif ($searchType === 'flatmate') {
            $query = QueryBuilder::for(Roommate::class)
                ->allowedFilters($this->allowedFlatmateFilters())
                ->with(['availability', 'favourites', 'viewedUsers'])
                ->tap(function ($builder) use ($request) {
                    if(filled($request->search)){
                        return $builder->whereIn('id', Roommate::search($request->search)->get()->pluck('id'));
                    }
                })
                ->latest();
    
            $results = RoommateSearchResource::collection($query->paginate(6)->appends($request->query()));

            if($request->wantsJson()){
                return $results;
            }
            
            return Inertia::render('Home/RoommateSearch',[
                'selectedRoommateQueries' => (object) $request->query(), //casting to object as we want an empty object if there is nothing in the query
                'results' => $results,
            ]);
        }
    }

    protected function allowedRentFilters()
    {
        return [
            AllowedFilter::scope('max_price'),
            AllowedFilter::scope('min_price'),
        ];
    }
    
    protected function allowedFlatmateFilters()
    {
        return [
            AllowedFilter::scope('max_budget'),
            AllowedFilter::scope('min_budget'),
        ];
    }
}
