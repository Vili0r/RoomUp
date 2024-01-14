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
    public function __invoke(Request $request): Response
    {
        $reportedListings = ReportedResource::collection(
            ReportedListing::query()
                ->with(['owner'])
                ->when($request->input('search'), function($query, $search) {
                    $query->where('contact_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('reason', 'like', "%{$search}%");
                })
                ->when($request->input('status'), function($query, $status) {
                    $query->where('status', $status);
                })
                ->latest()
                ->paginate(7)
            );

        return Inertia::render('Admin/Reported/Index', [
            'reportedListings' => $reportedListings,
            'filters' => $request->only(['search', 'status'])
        ]);
    }
}
