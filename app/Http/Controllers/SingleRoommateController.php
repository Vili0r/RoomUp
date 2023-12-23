<?php

namespace App\Http\Controllers;

use App\Http\Resources\Roommate\RoommateSinglePropertyResource;
use App\Jobs\UserViewedRoommate;
use App\Models\Roommate;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class SingleRoommateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Roommate $roommate): Response
    {        
        $roommate->load(['amenities', 'advertiser', 'hobbies', 'availability']);
    
        if($request->user()) {
            dispatch(new UserViewedRoommate($request->user(), $roommate));
        } else {
            $user = User::where('email', 'non-authenticated-user@roomup.gr')->first();
            dispatch(new UserViewedRoommate($user, $roommate));
        } 
       
        return Inertia::render('Home/SingleRoommate', [
            'roommate' => new RoommateSinglePropertyResource($roommate),
        ]);
    }
}
