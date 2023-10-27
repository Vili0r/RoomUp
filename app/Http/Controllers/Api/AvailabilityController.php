<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Flat;
use App\Models\Room;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AvailabilityController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $model, string $id)
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

        if($model === "room"){
            $property = Room::find($id);
        } elseif ($model === "flat") {
            $property = Flat::find($id);
        }

        if ($request->filled('live_at')){
            $carbonDate = Carbon::parse($request->live_at);
            $property->live_at = $carbonDate->format('Y-m-d');
        }
        
        if($request->available != $property->available){
            $isAvailable = $property->available;
            $property->update([
                'available' => !$isAvailable
            ]);
        }

        $property->save();
    }
}
