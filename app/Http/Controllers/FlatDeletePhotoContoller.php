<?php

namespace App\Http\Controllers;

use App\Models\Flat;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class FlatDeletePhotoContoller extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Flat $flat): RedirectResponse
    {
        $fileName = $request->query('fileName');

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

        return back();
    }
}
