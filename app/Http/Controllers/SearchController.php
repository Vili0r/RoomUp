<?php

namespace App\Http\Controllers;

use App\Models\Flat;
use App\Models\Shared;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use App\Http\QueryFilters\AmenityQueryFilter;
use App\Http\Resources\AmenitiesResource;
use App\Http\Resources\FlatSearchResultResource;
use App\Http\Resources\SharedSearchResultResource;
use App\Models\Amenity;

class SearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $query = null;
        $results = [];
        $searchType = $request->input('search_type', 'flats');
        // dd(Flat::query()->whereHas('amenities', function ($query) {
        //     $query->where('id', [2,4]);
        // })->get());


        if ($searchType === 'flats') {
            $query = QueryBuilder::for(Flat::withoutGlobalScope('filter_by_user'))
                ->allowedFilters($this->allowedFlatFilters())
                ->with(['amenities', 'address', 'transport', 'advertiser', 'flatmate', 'availability'])
                ->tap(function ($builder) use ($request) {
                    if(filled($request->search)){
                        return $builder->whereIn('id', Flat::search($request->search)->get()->pluck('id'));
                    }
                })
                ->latest();

            // Apply filters based on user input
            // ...

            $results = FlatSearchResultResource::collection($query->paginate(15)->appends($request->query()));
        } elseif ($searchType === 'shareds') {
            $query = QueryBuilder::for(Shared::withoutGlobalScope('filter_by_user'))
                ->allowedFilters($this->allowedSharedFilters())
                ->with(['amenities', 'address', 'transport', 'advertiser', 'rooms'])
                ->tap(function ($builder) use ($request) {
                    if(filled($request->search)){
                        return $builder->whereIn('id', Shared::search($request->search)->get()->pluck('id'));
                    }
                })
                ->latest();

            // Apply filters based on user input
            // ...

            $results = SharedSearchResultResource::collection($query->paginate(15)->appends($request->query()));
        }
        //dd($results);

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
        ];
    }
    
    protected function allowedSharedFilters()
    {
        return [
            'size',
            AllowedFilter::custom('amenity', new AmenityQueryFilter()),
            // AllowedFilter::scope('max_price'),
        ];
    }
}
