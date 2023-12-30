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
        $file = $request->file('avatar');
        $filename = uniqid() . "_" . $file->getClientOriginalName();
        $file->move(public_path('uploads/avatars'), $filename);
        $url = 'uploads/avatars/' . $filename;

        // Validate if a file was uploaded
        if (!$file) {
            return back()->with('status', 'no-file-found');
        }

        $user = $request->user();
        $user->update([
            'avatar' => $url
        ]);
        $user->save();

        $user->verification()->update([
            'photo_verified_at' =>  now(), 
        ]);

        return back()->with('status', 'profile-photo-uploaded');
    }
}
