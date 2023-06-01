<?php

namespace App\Http\Controllers;

use App\Models\Flat;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Carbon\Carbon;

class FlatAvailabilityController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Flat $flat): RedirectResponse
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
        

        $flat->live_at = $request->live_at;
        
        if($request->available != $flat->available){
            $isAvailable = $flat->available;
            $flat->update([
                'available' => !$isAvailable
            ]);
        }

        $flat->save();

        return back();
    }
}
