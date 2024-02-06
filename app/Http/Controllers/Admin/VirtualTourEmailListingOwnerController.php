<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Flat;
use App\Models\Shared;
use App\Models\VirtualTour;
use App\Notifications\VirtualTourBookingNotification;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Notification;

class VirtualTourEmailListingOwnerController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, VirtualTour $virtualTour): RedirectResponse
    {
        $this->authorize('approve comments');

        if ($request->model == 'flat') {
            $property = Flat::with(['user'])->findOrFail($request->owner_id);
            $propertyUserEmail = $property->user->email;
        } elseif ($request->model == 'shared') {
            $property = Shared::with(['user'])->findOrFail($request->owner_id);
            $propertyUserEmail = $property->user->email;
        }

        $message = [
            'propertyId' => $request->owner_id,
            'propertyModel' => $request->model,
            'propertyTitle' => $request->title,
            'details' => $request->details,                         
        ];

        Notification::route('mail', $propertyUserEmail)
            ->notify(new VirtualTourBookingNotification($message));

        $virtualTour->update([
            'status' => 2
        ]);

        return to_route('admin.virtual-tours.index');
    }
}
