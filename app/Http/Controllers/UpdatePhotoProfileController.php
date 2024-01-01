<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class UpdatePhotoProfileController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $request->validate([
            'avatar' => 'required',
        ]);

        if ($request->file('avatar')){
            $file = $request->file('avatar');
            $filename = uniqid() . "_" . $file->getClientOriginalName();
            $file->move(public_path('uploads/avatars'), $filename);
            $url = 'uploads/avatars/' . $filename;

            $user = $request->user();
            $user->update([
                'avatar' => $url
            ]);
            $user->save();

            $user->verification()->update([
                'photo_verified_at' =>  now(), 
                'selfie_verified_at' => null,
            ]);

            return back()->with('status', 'profile-photo-uploaded');
        }
        return back()->with('status', 'profile-photo-not-uploaded');
    }
}
