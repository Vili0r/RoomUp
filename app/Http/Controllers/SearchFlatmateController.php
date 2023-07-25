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
            AllowedFilter::custom('size', new RoomSizeQueryFilter()),
            AllowedFilter::custom('amenity', new RoomAmenityQueryFilter()),
            AllowedFilter::custom('mode', new RoomModeQueryFilter()),
            AllowedFilter::custom('minutes', new RoomMinuteQueryFilter()),
            AllowedFilter::custom('station', new RoomStationQueryFilter()),
            AllowedFilter::custom('available_rooms', new RoomAvailableRoomsQueryFilter()),
            AllowedFilter::custom('current_occupants', new RoomCurrentOccupantsQueryFilter()),
            AllowedFilter::custom('current_flatmate_occupation', new RoomCurrentFlatmateOccupationQueryFilter()),
            AllowedFilter::custom('current_flatmate_pets', new RoomCurrentFlatmatePetsQueryFilter()),
            AllowedFilter::custom('current_flatmate_gender', new RoomCurrentFlatmateGenderQueryFilter()),
            AllowedFilter::custom('current_flatmate_smoker', new RoomCurrentFlatmateSmokerQueryFilter()),
            AllowedFilter::scope('max_price'),
            AllowedFilter::scope('min_price'),
        ];
    }
}
