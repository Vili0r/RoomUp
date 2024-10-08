<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Flat;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use App\Http\QueryFilters\AmenityQueryFilter;
use App\Http\QueryFilters\MinuteQueryFilter;
use App\Http\QueryFilters\ModeQueryFilter;
use App\Http\QueryFilters\AvailableFromQueryFilter;
use App\Http\QueryFilters\NewFlatmatePetsQueryFilter;
use App\Http\QueryFilters\RoomQueryFilters\RoomAmenityQueryFilter;
use App\Http\QueryFilters\RoomQueryFilters\RoomAvailableRoomsQueryFilter;
use App\Http\QueryFilters\RoomQueryFilters\RoomCurrentFlatmateGenderQueryFilter;
use App\Http\QueryFilters\RoomQueryFilters\RoomCurrentFlatmateOccupationQueryFilter;
use App\Http\QueryFilters\RoomQueryFilters\RoomCurrentFlatmatePetsQueryFilter;
use App\Http\QueryFilters\RoomQueryFilters\RoomCurrentFlatmateSmokerQueryFilter;
use App\Http\QueryFilters\RoomQueryFilters\RoomCurrentOccupantsQueryFilter;
use App\Http\QueryFilters\RoomQueryFilters\RoomMinuteQueryFilter;
use App\Http\QueryFilters\RoomQueryFilters\RoomModeQueryFilter;
use App\Http\QueryFilters\RoomQueryFilters\RoomSizeQueryFilter;
use App\Http\QueryFilters\RoomQueryFilters\RoomStationQueryFilter;
use App\Http\QueryFilters\ShortTermQueryFilter;
use App\Http\QueryFilters\StationQueryFilter;
use App\Http\Resources\FlatSearchResultResource;
use App\Http\Resources\RoomSearchResultResource;
use App\Models\Room;

class AdvancedPropertySearchController extends Controller
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
                ->allowedFilters($this->allowedFlatFilters())
                ->with(['address', 'availability', 'favourites', 'viewedUsers'])
                ->tap(function ($builder) use ($request) {
                    if(filled($request->search)){
                        return $builder->whereIn('id', Flat::search($request->search)->get()->pluck('id'));
                    }
                })
                ->latest();
                
            $results = FlatSearchResultResource::collection($query->paginate(6)->appends($request->query()));
        } elseif ($searchType === 'shareds') {
            $query = QueryBuilder::for(Room::class)
                ->allowedFilters($this->allowedSharedFilters())
                ->with(['owner.address', 'favourites', 'viewedUsers'])
                ->tap(function ($builder) use ($request) {
                    if(filled($request->search)){
                        return $builder->whereIn('id', Room::search($request->search)->get()->pluck('id'));
                    }
                })
                ->latest();
   
            $results = RoomSearchResultResource::collection($query->paginate(6)->appends($request->query()));
        }
     
        return response()->json([
            'selectedPropertyQueries' => (object) $request->query(),
            'data' => $results,
            'pagination' => [
                'total' => $results->total(),
                'count' => $results->count(),
                'per_page' => $results->perPage(),
                'current_page' => $results->currentPage(),
                'total_pages' => $results->lastPage(),
                'links' => [
                    'prev' => $results->previousPageUrl(),
                    'next' => $results->nextPageUrl(),
                ],
            ],
        ]);
    }

    protected function allowedFlatFilters()
    {
        return [
            'size',
            'type',
            AllowedFilter::custom('amenity', new AmenityQueryFilter()),
            AllowedFilter::custom('mode', new ModeQueryFilter()),
            AllowedFilter::custom('minutes', new MinuteQueryFilter()),
            AllowedFilter::custom('station', new StationQueryFilter()),
            AllowedFilter::custom('available_from', new AvailableFromQueryFilter()),
            AllowedFilter::custom('short_term', new ShortTermQueryFilter()),
            AllowedFilter::custom('new_flatmate_pets', new NewFlatmatePetsQueryFilter()),
            AllowedFilter::scope('max_price'),
            AllowedFilter::scope('min_price'),
            AllowedFilter::scope('furnished'),
        ];
    }
    
    protected function allowedSharedFilters()
    {
        return [
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
            AllowedFilter::scope('available_from'),
            AllowedFilter::scope('short_term'),
            AllowedFilter::scope('furnished'),
        ];
    }
}
