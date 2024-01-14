<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ReportedListing;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class ReportedListingResolveController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, ReportedListing $reportedListing): RedirectResponse
    {
        $this->authorize('approve comments');
        
        $reportedListing->update([
            'resolved_at' => now(),
            'status' => 3,
        ]);

        return to_route('admin.reported-listings.index');
    }
}
