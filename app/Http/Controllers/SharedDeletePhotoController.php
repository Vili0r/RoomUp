<?php

namespace App\Http\Controllers;

use App\Models\Shared;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SharedDeletePhotoController extends Controller
{
    public function __invoke(Request $request, Shared $shared): RedirectResponse
    {
        $fileName = $request->query('fileName');

        Storage::delete($fileName);

        // Retrieve the images array
        $images = [];
        $images = $shared->images;

        // Find the index of the file name in the images array
        $index = array_search($fileName, $images);
        
        // Remove the file name from the images array
        if ($index !== false) {
            unset($images[$index]);
        }
        
        // Re-index the array
        $images = array_values($images);

        //Updating the images on Database
        $shared->update([
            'images' => $images
        ]);

        return back();
    }
}
