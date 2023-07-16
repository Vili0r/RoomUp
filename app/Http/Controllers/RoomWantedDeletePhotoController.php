<?php

namespace App\Http\Controllers;

use App\Models\RoomWanted;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RoomWantedDeletePhotoController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, RoomWanted $roomWanted): RedirectResponse
    {
        $fileName = $request->query('fileName');

        Storage::delete($fileName);

        // Retrieve the images array
        $images = [];
        $images = $roomWanted->images;

        // Find the index of the file name in the images array
        $index = array_search($fileName, $images);
        
        // Remove the file name from the images array
        if ($index !== false) {
            unset($images[$index]);
        }
        
        // Re-index the array
        $images = array_values($images);

        //Updating the images on Database
        $roomWanted->update([
            'images' => $images
        ]);

        return back();
    }
}
