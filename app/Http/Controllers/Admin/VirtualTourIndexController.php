<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\VirtualTourIndexResource;
use App\Models\VirtualTour;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class VirtualTourIndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $virtualTours = VirtualTourIndexResource::collection(
            VirtualTour::query()
                ->with(['owner'])
                ->when($request->input('search'), function($query, $search) {
                    $query->where('contact_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('details', 'like', "%{$search}%")
                        ->orWhere('contact_number', 'like', "%{$search}%");
                })
                ->when($request->input('status'), function($query, $status) {
                    $query->where('status', $status);
                })
                ->when($request->input('paymentStatus'), function($query, $status) {
                    $query->where('payment_status', $status);
                })
                ->latest()
                ->paginate(7)
            );

        return Inertia::render('Admin/Tour/Index', [
            'virtualTours' => $virtualTours,
            'filters' => $request->only(['search', 'status', 'paymentStatus'])
        ]);
    }
}
