<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReportedResource;
use App\Models\ReportedListing;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class ReportedListingIndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $reportedListings = ReportedResource::collection(
            ReportedListing::query()
                ->with(['owner'])
                ->when($request->input('search'), function($query, $search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%");
                })
                ->when($request->input('approved'), function($query, $approved) {
                    $query->where('approved', $approved);
                })
                ->latest()
                ->paginate(7)
            );

        return Inertia::render('Admin/Reported/Index', [
            'reportedListings' => $reportedListings,
            'filters' => $request->only(['search', 'approved'])
        ]);
    }
}
