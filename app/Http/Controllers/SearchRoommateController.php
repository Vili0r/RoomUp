<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use App\Models\Roommate;
use App\Http\QueryFilters\RoommateQueryFilters\RoommateHobbiesQueryFilter;
use App\Http\QueryFilters\RoommateQueryFilters\RoommateShortTermQueryFilter;
use App\Http\Resources\Roommate\RoommateSearchResource;
use Inertia\Inertia;

class SearchRoommateController extends Controller
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
            ->with(['availability'])
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
            AllowedFilter::scope('max_budget'),
            AllowedFilter::scope('min_budget'),
            AllowedFilter::scope('max_age'),
            AllowedFilter::scope('min_age'),
        ];
    }
}
