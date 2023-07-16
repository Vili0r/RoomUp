<?php

namespace App\Http\Controllers;

use App\Models\RoomWanted;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Carbon\Carbon;

class RoomWantedAvailabilityController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, RoomWanted $roomWanted): RedirectResponse
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
        

        $roomWanted->live_at = $request->live_at;
        
        if($request->available != $roomWanted->available){
            $isAvailable = $roomWanted->available;
            $roomWanted->update([
                'available' => !$isAvailable
            ]);
        }

        $roomWanted->save();

        return back();
    }
}
