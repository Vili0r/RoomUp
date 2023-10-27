<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Flat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FlatDeletePhotoController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Flat $flat)
    {
        $fileName = $request->fileName;

        Storage::delete($fileName);

        // Retrieve the images array
        $images = [];
        $images = $flat->images;

        // Find the index of the file name in the images array
        $index = array_search($fileName, $images);
        
        // Remove the file name from the images array
        if ($index !== false) {
            unset($images[$index]);
        }
        
        // Re-index the array
        $images = array_values($images);

        //Updating the images on Database
        $flat->update([
            'images' => $images
        ]);

        return response()->noContent();
    }
}
