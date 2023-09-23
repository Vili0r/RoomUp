<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use App\Http\Resources\FlatSearchResultResource;
use App\Http\Resources\RoomSearchResultResource;
use App\Http\Resources\Roommate\RoommateSearchResource;
use App\Models\Flat;
use App\Models\Room;
use App\Models\Roommate;

class HeaderFilterController extends Controller
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
                ->allowedFilters(['type'])
                ->with(['address', 'availability', 'favourites', 'viewedUsers'])
                ->latest();
                
            // $results = FlatSearchResultResource::collection($query->paginate(6)->appends($request->query()));
            $paginatedResults = $query->paginate(6)->appends($request->query());
            $resourceCollection = FlatSearchResultResource::collection($paginatedResults);
        } elseif ($searchType === 'shareds') {
            $query = QueryBuilder::for(Room::class)
                ->with(['owner.address', 'favourites', 'viewedUsers'])
                ->latest();
   
            //$results = RoomSearchResultResource::collection($query->paginate(6)->appends($request->query()));
            $paginatedResults = $query->paginate(6)->appends($request->query());
            $resourceCollection = RoomSearchResultResource::collection($paginatedResults);
        } elseif ($searchType === 'roommate') {
            $query = QueryBuilder::for(Roommate::class)
            ->with(['availability', 'favourites', 'viewedUsers'])
            ->latest();

            $paginatedResults = $query->paginate(6)->appends($request->query());
            $resourceCollection = RoommateSearchResource::collection($paginatedResults);
        }

        // Build the response data with results and query parameters
        $response = [
            'data' => $resourceCollection,
            'selectedPropertyQueries' => (object) $request->query(),
        ];

        // Add pagination links to the response
        $response['pagination'] = [
            'links' => [
                'first' => $paginatedResults->url(1),
                'last' => $paginatedResults->url($paginatedResults->lastPage()),
                'prev' => $paginatedResults->previousPageUrl(),
                'next' => $paginatedResults->nextPageUrl(),
            ],
            'meta' => [
                'current_page' => $paginatedResults->currentPage(),
                'from' => $paginatedResults->firstItem(),
                'to' => $paginatedResults->lastItem(),
                'per_page' => $paginatedResults->perPage(),
                'total' => $paginatedResults->total(),
                'last_page' => $paginatedResults->lastPage(),
            ],
        ];

        // Return the response as JSON
        return response()->json($response);
    }
}
