<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UpdateProfilePhotoController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
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
            return response()->json([
                'success' => false,
                'message' => 'No file uploaded',
            ]);
        }

        $user = $request->user();
        $user->update([
            'avatar' => $url
        ]);
        $user->save();
        
        return response()->json([
            'success' => true,
            'message' => 'Upload and move success',
        ]);
    }
}
