<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FlatSearchResultResource;
use App\Http\Resources\RoomSearchResultResource;
use App\Models\Address;
use App\Models\Flat;
use App\Models\Room;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Database\Eloquent\Builder;

class MapSearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $roomQuery = null;
        $flatQuery = null;
        
        $roomQuery = RoomSearchResultResource::collection(
                QueryBuilder::for(Room::class)
                    ->with(['owner.address', 'favourites', 'viewedUsers'])
                    ->whereHas('owner.address', function ($addressQuery) use ($request) {
                        $latitude = $request->input('latitude');
                        $longitude = $request->input('longitude');
                        $radius = 1; // Adjust the radius as needed
            
                        // Calculate the bounding box
                        $minLat = $latitude - ($radius / 111);
                        $maxLat = $latitude + ($radius / 111);
                        $minLng = $longitude - ($radius / (111 * cos(deg2rad($latitude))));
                        $maxLng = $longitude + ($radius / (111 * cos(deg2rad($latitude))));
            
                        // Filter records within the bounding box
                        $addressQuery->whereBetween('lat', [$minLat, $maxLat])
                            ->whereBetween('long', [$minLng, $maxLng]);
                    })
                    ->get()
                );
        
        $flatQuery = FlatSearchResultResource::collection(
                QueryBuilder::for(Flat::class)
                    ->with(['address', 'availability', 'favourites', 'viewedUsers'])
                    ->whereHas('address', function ($addressQuery) use ($request) {
                        $latitude = $request->input('latitude');
                        $longitude = $request->input('longitude');
                        $radius = 5; // Adjust the radius as needed
            
                        // Calculate the bounding box
                        $minLat = $latitude - ($radius / 111);
                        $maxLat = $latitude + ($radius / 111);
                        $minLng = $longitude - ($radius / (111 * cos(deg2rad($latitude))));
                        $maxLng = $longitude + ($radius / (111 * cos(deg2rad($latitude))));
            
                        // Filter records within the bounding box
                        $addressQuery->whereBetween('lat', [$minLat, $maxLat])
                            ->whereBetween('long', [$minLng, $maxLng]);
                    })
                    ->get()
                );

        $properties = $roomQuery
            ->concat($flatQuery)
            ->sortByDesc('created_at');

        return $properties;
    }
}
