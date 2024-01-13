<?php

namespace App\Http\Controllers;

use App\Enums\ReportedListingReason;
use App\Http\Requests\ReportedListingStoreRequest;
use App\Http\Resources\EnumResource;
use App\Http\Resources\PropertyReportedResource;
use App\Http\Resources\Roommate\RoommateReportedResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Flat;
use App\Models\ReportedListing;
use App\Models\Room;
use App\Models\Roommate;
use Illuminate\Http\RedirectResponse;

class ReportedListingController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response 
    {
        if ($request->type == 'flat') {
            $property = Flat::findOrFail($request->id);
            
            return Inertia::render('Reported/Create',[
                'property' => new PropertyReportedResource($property),
                'reasons' => EnumResource::collection(ReportedListingReason::cases()),
            ]);
        } elseif ($request->type == 'room') {
            $property = Room::findOrFail($request->id);
            $property->load(['owner']);

            return Inertia::render('Reported/Create',[
                'property' => new PropertyReportedResource($property),
                'reasons' => EnumResource::collection(ReportedListingReason::cases()),
            ]);
        } elseif ($request->type == 'roommate') {
            $roommate = Roommate::findOrFail($request->id);

            return Inertia::render('Reported/Create',[
                'property' => new RoommateReportedResource($roommate),
                'reasons' => EnumResource::collection(ReportedListingReason::cases()),
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReportedListingStoreRequest $request): RedirectResponse
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

        return to_route('dashboard');
    }
}
