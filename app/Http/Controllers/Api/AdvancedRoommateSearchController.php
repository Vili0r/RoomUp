<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\QueryFilters\RoommateQueryFilters\RoommateAvailableFromQueryFilter;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use App\Models\Roommate;
use App\Http\QueryFilters\RoommateQueryFilters\RoommateHobbiesQueryFilter;
use App\Http\QueryFilters\RoommateQueryFilters\RoommateShortTermQueryFilter;
use App\Http\Resources\Roommate\RoommateSearchResource;

class AdvancedRoommateSearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $query = null;
        $results = [];
        
        $query = QueryBuilder::for(Roommate::class)
            ->allowedFilters($this->allowedRoommateFilters())
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
        
        return response()->json([
            'selectedRoommateQueries' => (object) $request->query(), //casting to object as we want an empty object if there is nothing in the query
            'results' => $results,
        ]);
    }

    protected function allowedRoommateFilters()
    {
        return [
            'room_size',
            'smoker',
            'pets',
            'gender',
            'occupation',
            'city',
            'area',
            'title',
            AllowedFilter::custom('hobbies', new RoommateHobbiesQueryFilter()),
            AllowedFilter::custom('short_term', new RoommateShortTermQueryFilter()),
            AllowedFilter::custom('available_from', new RoommateAvailableFromQueryFilter()),
            AllowedFilter::scope('max_budget'),
            AllowedFilter::scope('min_budget'),
            AllowedFilter::scope('max_age'),
            AllowedFilter::scope('min_age'),
        ];
    }
}
