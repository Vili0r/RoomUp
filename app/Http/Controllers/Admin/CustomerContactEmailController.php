<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CustomerContact;
use App\Notifications\CustomerContactRespondNotification;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Notification;

class CustomerContactEmailController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, CustomerContact $customerContact): RedirectResponse
    {
        $this->authorize('approve comments');

        $message = [
            'details' => $request->details,              
            'reason' => $customerContact->reason,              
        ];

        Notification::route('mail', [$customerContact->email, 'admin@roomup.gr'])
            ->notify(new CustomerContactRespondNotification($message));

        return to_route('admin.customer-contacts.index');
    }
}
