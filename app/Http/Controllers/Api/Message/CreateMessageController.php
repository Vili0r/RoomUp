<?php

namespace App\Http\Controllers\Api\Message;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\PropertyMessageResource;
use App\Http\Resources\Roommate\RoommateMessageResource;
use App\Models\Flat;
use App\Models\Room;
use App\Models\Roommate;

class CreateMessageController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        if ($request->type == 'flat') {
            $property = Flat::findOrFail($request->id);
            $property->load(['address', 'advertiser']);
            
            return new PropertyMessageResource($property);
        } elseif ($request->type == 'room') {
            $property = Room::findOrFail($request->id);
            $property->load(['owner.address', 'owner.advertiser']);

            return new PropertyMessageResource($property);          
        } elseif ($request->type == 'roommate') {
            $roommate = Roommate::findOrFail($request->id);
            $roommate->load('advertiser');

            return new RoommateMessageResource($roommate);
        }
    }
}
