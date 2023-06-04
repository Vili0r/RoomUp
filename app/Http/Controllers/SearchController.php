<?php

namespace App\Http\Controllers;

use App\Http\Resources\FlatIndexResource;
use App\Http\Resources\SharedIndexResource;
use App\Models\Flat;
use App\Models\Shared;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use App\Http\QueryFilters\AmenityQueryFilter;
use App\Http\Resources\AmenitiesResource;
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

        if ($searchType === 'flats') {
            $query = QueryBuilder::for(Flat::class)
                ->allowedFilters($this->allowedFilters())
                ->with(['amenities', 'address', 'transport', 'advertiser', 'flatmate', 'availability'])
                ->latest();

            // Apply filters based on user input
            // ...

            $results = FlatIndexResource::collection($query->paginate(15));
        } elseif ($searchType === 'shareds') {
            $query = QueryBuilder::for(Shared::class)
                ->allowedFilters(['size'])
                ->with(['amenities', 'address', 'transport', 'advertiser'])
                ->latest();

            // Apply filters based on user input
            // ...

            $results = SharedIndexResource::collection($query->paginate(15));
        }

        //dd($results);
        return Inertia::render('Home/Search',[
            'amenities' => AmenitiesResource::collection(Amenity::all()),
            'results' => $results,
            // 'flats' => FlatIndexResource::collection(
            //     QueryBuilder::for(Flat::class)
            //         ->allowedFilters($this->allowedFilters())
            //         ->with(['amenities', 'address', 'transport', 'advertiser', 'flatmate', 'availability'])
            //         ->latest()
            //         ->paginate(15)
            // ),
            // 'shareds' => SharedIndexResource::collection(Shared::latest()->paginate(15)),
        ]);
    }

    protected function allowedFilters()
    {
        return [
            'size',
            'type',
            AllowedFilter::custom('amenity', new AmenityQueryFilter()),
            AllowedFilter::scope('max_price'),
        ];
    }
}
