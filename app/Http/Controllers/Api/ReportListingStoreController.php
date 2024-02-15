<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReportedListingStoreRequest;
use Illuminate\Http\Request;
use App\Models\Flat;
use App\Models\ReportedListing;
use App\Models\Room;
use App\Models\Roommate;

class ReportListingStoreController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(ReportedListingStoreRequest $request)
    {
        if ($request->owner_type == 'flat') {
            $property = Flat::findOrFail($request->owner_id);
        } elseif ($request->owner_type == 'room') {
            $property = Room::findOrFail($request->owner_id);
        } elseif ($request->owner_type == 'roommate') {
            $property = Roommate::findOrFail($request->owner_id);
        }

        $property->reported()->create([
            'contact_name' => $request->contact_name,
            'email' => $request->email,
            'reason' => $request->reason,
            'status' => 1,
            'details' => $request->details,
        ]);

        return response()->json("Listing Reported successfully", 200);
    }
}
