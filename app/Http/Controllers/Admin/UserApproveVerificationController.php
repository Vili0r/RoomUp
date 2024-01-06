<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\ApprovedVerificationNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Http\RedirectResponse;

class UserApproveVerificationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(User $user, Request $request): RedirectResponse
    {
        $this->authorize('user management');

        $user->verification()->update([
            'profile_verified_at' => now(),
            'status' =>  2, 
        ]);

        Notification::route('mail', $user->email)
                ->notify(new ApprovedVerificationNotification());

        return to_route('admin.user.verification.index');
    }
}
