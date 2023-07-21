<?php

namespace App\Http\Controllers;

use App\Models\Flat;
use App\Models\Shared;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use App\Http\QueryFilters\AmenityQueryFilter;
use App\Http\QueryFilters\RoomAmenityQueryFilter;
use App\Http\Resources\AmenitiesResource;
use App\Http\Resources\FlatSearchResultResource;
use App\Http\Resources\RoomSearchResultResource;
use App\Http\Resources\SharedSearchResultResource;
use App\Models\Amenity;
use App\Models\Room;
use Inertia\Response;

class SearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $query = null;
        $results = [];
        $searchType = $request->input('search_type', 'flats');


        if ($searchType === 'flats') {
            $query = QueryBuilder::for(Flat::class)
                ->allowedFilters($this->allowedFlatFilters())
                ->with(['address', 'availability'])
                ->latest();

            $results = FlatSearchResultResource::collection($query->paginate(6)->appends($request->query()));
        } elseif ($searchType === 'shareds') {
            $query = QueryBuilder::for(Room::class)
                ->allowedFilters($this->allowedSharedFilters())
                ->with(['owner.address'])
                ->latest();
   
            $results = RoomSearchResultResource::collection($query->paginate(6)->appends($request->query()));
        }

        return Inertia::render('Home/Search',[
            'selectedQueries' => (object) $request->query(), //casting to object as we want an empty object if there is nothing in the query
            'results' => $results,
            'loading' => false,
        ]);
    }


    protected function allowedFlatFilters()
    {
        return [
            'size',
            'type',
            AllowedFilter::custom('amenity', new AmenityQueryFilter()),
            AllowedFilter::scope('max_price'),
            AllowedFilter::scope('min_price'),
        ];
    }
    
    protected function allowedSharedFilters()
    {
        return [
            'size',
            AllowedFilter::custom('amenity', new RoomAmenityQueryFilter()),
            AllowedFilter::scope('max_price'),
        ];
    }
}
