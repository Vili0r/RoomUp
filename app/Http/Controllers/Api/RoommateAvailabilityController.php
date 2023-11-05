<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Roommate;

class RoommateAvailabilityController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Roommate $roommate)
    {
        if ($request->filled('live_at')) {
            $request->validate([
                'live_at' => [
                    'after:' . Carbon::now()->format('d-m-Y')
                  ],
                'available' => ['sometimes'],
            ],['live_at.after' => 'The date should be after today']);
        } else {
            $request->validate([
                'live_at' => ['sometimes'],
                'available' => ['sometimes'],
            ]);
        }
        

        if ($request->filled('live_at')){
            $carbonDate = Carbon::parse($request->live_at);
            $roommate->update([
                'live_at' => $carbonDate->format('Y-m-d')
            ]);
        }
        
        if($request->available != $roommate->available){
            $isAvailable = $roommate->available;
            $roommate->update([
                'available' => !$isAvailable
            ]);
        }

        $roommate->save();
    }
}
