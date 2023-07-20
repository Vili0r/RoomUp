<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use App\Models\Roommate;
use Inertia\Response;
use App\Http\QueryFilters\AmenityQueryFilter;
use App\Http\Resources\Roommate\RoommateResource;
use Inertia\Inertia;

class SearchFlatmateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $query = null;
        $results = [];

        
        $query = QueryBuilder::for(Roommate::class)
            ->allowedFilters($this->allowedFlatmateFilters())
            ->with(['owner.address'])
            ->latest();
    
        $results = RoommateResource::collection($query->paginate(6)->appends($request->query()));
        
        return Inertia::render('Home/Search',[
            'selectedQueries' => (object) $request->query(), //casting to object as we want an empty object if there is nothing in the query
            'results' => $results,
            'loading' => false,
        ]);
    }

    protected function alloweFlatmateFilters()
    {
        return [
            'size',
            AllowedFilter::custom('amenity', new AmenityQueryFilter()),
            AllowedFilter::scope('max_price'),
        ];
    }
}
