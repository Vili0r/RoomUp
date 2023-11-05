<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Roommate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RoommateDeletePhotoController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Roommate $roommate)
    {
        $fileName = $request->fileName;

        Storage::delete($fileName);

        // Retrieve the images array
        $images = [];
        $images = $roommate->images;

        // Find the index of the file name in the images array
        $index = array_search($fileName, $images);
        
        // Remove the file name from the images array
        if ($index !== false) {
            unset($images[$index]);
        }
        
        // Re-index the array
        $images = array_values($images);

        //Updating the images on Database
        $roommate->update([
            'images' => $images
        ]);

        return response()->noContent();
    }
}
