<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Jobs\UserViewedRoommate;
use App\Models\Roommate;
use App\Http\Resources\Roommate\RoommateSinglePropertyResource;

class SingleRoommateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Roommate $roommate)
    {
        $roommate->load(['amenities', 'advertiser', 'hobbies', 'availability']);
    
        if($request->user()) {
            dispatch(new UserViewedRoommate($request->user(), $roommate));
        }
       
        return response()->json([
            'roommate' => new RoommateSinglePropertyResource($roommate),
        ]);
    }
}
