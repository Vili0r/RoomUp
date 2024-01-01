<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class UpdateSelfieController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'selfie' => 'nullable',
        ]);

        if ($request->filled('selfie')) {
            $imageData = $request->get('selfie');

            // Decode the image data and save it
            $image = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $imageData));

            // Generate a unique filename
            $filename = 'photoSelfie_' . uniqid() . "_" . time() . '.jpg';

            // Relative directory path where you want to save the image
            $relativePath = 'uploads/selfies';

            // Absolute directory path
            $directoryPath = public_path($relativePath);

            // Make sure the directory exists
            File::isDirectory($directoryPath) or File::makeDirectory($directoryPath, 0777, true, true);

            // Full path to where the file will be saved
            $fullPath = $directoryPath . '/' . $filename;

            // Save the image
            file_put_contents($fullPath, $image);

            // Manually remove the absolute part of the path
            $savedPath = ltrim(str_replace(public_path(), '', $fullPath), '/');

            $user = $request->user();
            $user->verification()->update([
                'selfie' => $savedPath,
                'selfie_verified_at' => now()
            ]);
            $user->save();

            return back();
        }

        return '';
    }
}
