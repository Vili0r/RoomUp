<?php

namespace App\Http\Controllers;

use App\Models\Shared;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Carbon\Carbon;

class SharedAvailabilityController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Shared $shared): RedirectResponse
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
        

        $shared->live_at = $request->live_at;
        
        if($request->available != $shared->available){
            $isAvailable = $shared->available;
            $shared->update([
                'available' => !$isAvailable
            ]);
        }

        $shared->save();

        return back();
    }
}
