<?php

namespace App\Http\Controllers;

use App\Models\Roommate;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Carbon\Carbon;

class RoommateAvailabilityController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Roommate $roommate): RedirectResponse
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
        

        $roommate->live_at = $request->live_at;
        
        if($request->available != $roommate->available){
            $isAvailable = $roommate->available;
            $roommate->update([
                'available' => !$isAvailable
            ]);
        }

        $roommate->save();

        return back();
    }
}
