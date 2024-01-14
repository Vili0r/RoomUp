<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Models\ReportedListing;
use App\Notifications\ReportListingEmailToListingOwnerNotification;
use Illuminate\Support\Facades\Notification;
use App\Models\Flat;
use App\Models\Room;
use App\Models\Roommate;

class ReportedListingEmailListingOwnerController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, ReportedListing $reportedListing): RedirectResponse
    {
        $this->authorize('approve comments');

        if ($request->model == 'flat') {
            $property = Flat::with(['user'])->findOrFail($request->owner_id);
            $propertyUserEmail = $property->user->email;
        } elseif ($request->model == 'room') {
            $property = Room::with(['owner.user'])->findOrFail($request->owner_id);
            $propertyUserEmail = $property->owner->user->email;
        } elseif ($request->model == 'roommate') {
            $property = Roommate::with(['user'])->findOrFail($request->owner_id);
            $propertyUserEmail = $property->user->email;
        }

        $message = [
            'propertyId' => $request->owner_id,
            'propertyModel' => $request->model,
            'propertyTitle' => $request->title,
            'details' => $request->details,              
            'reason' => $request->reason,              
        ];

        Notification::route('mail', $propertyUserEmail)
            ->notify(new ReportListingEmailToListingOwnerNotification($message));

        $reportedListing->update([
            'status' => 2
        ]);

        return to_route('admin.reported-listings.index');
    }
}
