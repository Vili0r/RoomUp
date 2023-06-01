<?php

namespace App\Http\Controllers;

use App\Models\TemporaryImage;
use Illuminate\Http\Request;

class TemporaryImageUploadController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        if($request->hasFile('images')){
           
            $request->validate([
                'images' => ['required', 'file', 'image'],
            ]);
            
            $request->file('images')->store('public/image');
    
            $uploadedFile = $request->file('images');
    
            $image = TemporaryImage::create([
                'folder' => $uploadedFile->extension(),
                'file' => $uploadedFile->hashName(),
            ]);

            return $image;
        }
        
        return '';
    }
}
