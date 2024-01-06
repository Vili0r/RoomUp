<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Http\RedirectResponse;
use App\Models\User;
use App\Notifications\ApprovedVerificationNotification;
use App\Notifications\RejectedVerificationNotification;

class UserRejectVerificationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(User $user, Request $request): RedirectResponse
    {
        $this->authorize('user management');

        $text = $request->text;
        $message = [];

        if (stripos($text, 'last name') !== false) {
            $user->verification()->update([
                'last_name_verified_at' => null,
                'status' =>  3, 
            ]);

            $user->save();
            $message[] = "We encountered an issue verifying your last name. Please ensure you have the right information.";
        }

        if (stripos($text, 'avatar') !== false) {
            $user->verification()->update([
                'photo_verified_at' => null,
                'status' =>  3, 
            ]);

            $user->save();
            $message[] = "We encountered an issue verifying your photo profile. Please ensure it's a clear, recent photo of your face.";
        }
        
        if (stripos($text, 'socials') !== false) {
            $user->verification()->update([
                'social_media_verified_at' => null,
                'status' =>  3, 
            ]);

            $user->save();
            $message[] = "We encountered an issue verifying your social media. Please ensure you have the right information.";
        }

        if (stripos($text, 'selfie') !== false) {
            $user->verification()->update([
                'selfie_verified_at' => null,
                'status' =>  3, 
            ]);

            $user->save();
            $message[] = "We encountered an issue verifying your selfie. Please ensure it's a clear, recent photo of your face.";
        }

        if (stripos($text, 'id') !== false) {
            $user->verification()->update([
                'id_document_verified_at' => null,
                'status' =>  3, 
            ]);

            $user->save();
            $message[] = "We encountered an issue verifying your ID document. Please ensure it's a clear.";
        } 

        // Send a notification only if there are issues
        if (!empty($message)) {
            $combinedMessage = implode(" Also, ", $message); // Combine messages for multiple issues
            Notification::route('mail', $user->email)
                        ->notify(new RejectedVerificationNotification($combinedMessage)); // Pass the combined message to your notification
        }

        return to_route('admin.user.verification.index');
    }
}
