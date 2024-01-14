<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ReportedListing;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\Flat;
use App\Models\Room;
use App\Models\Roommate;
use App\Notifications\ListingDeletedNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;

class ReportedListingDeletePropertyController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, ReportedListing $reportedListing): RedirectResponse
    {
        $this->authorize('user management');

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

        Storage::delete($property->images);
        $property->delete();

        $message = [
            'propertyId' => $request->owner_id,
            'propertyModel' => $request->model,
            'propertyTitle' => $request->title,           
        ];

        Notification::route('mail', $propertyUserEmail)
            ->notify(new ListingDeletedNotification($message));
        
        $reportedListing->update([
            'status' => 4,
        ]);

        return to_route('admin.reported-listings.index');
    }
}
