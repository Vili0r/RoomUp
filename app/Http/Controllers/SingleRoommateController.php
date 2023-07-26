<?php

namespace App\Http\Controllers;

use App\Http\Resources\Roommate\RoommateResource;
use App\Jobs\UserViewedRoommate;
use App\Models\Roommate;
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
        $roommate->load(['amenities', 'advertiser', 'hobbies', 'flatmate', 'availability']);
    
        if($request->user()) {
            dispatch(new UserViewedRoommate($request->user(), $roommate));
        }
       
        return Inertia::render('Home/SingleRoommate', [
            'roommate' => new RoommateResource($roommate),
        ]);
    }
}
