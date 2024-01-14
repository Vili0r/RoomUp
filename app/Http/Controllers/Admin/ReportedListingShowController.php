<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReportedResource;
use App\Models\ReportedListing;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class ReportedListingShowController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, ReportedListing $reportedListing): Response
    {
        $this->authorize('approve comments');

        $reportedListing->load('owner');

        return Inertia::render('Admin/Reported/Show', [
            'reportedListing' => new ReportedResource($reportedListing),
        ]);
    }
}
