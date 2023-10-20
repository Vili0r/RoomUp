<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TemporaryImage;
use Illuminate\Http\Request;

class TemporaryImageUploadController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $images = [];
         if($request->hasFile('images')){
            $data = $request->validate([
                'images' => 'required|array'
            ]);
            foreach ($data['images'] as $image) {
                $image_path =  $image->store('public/image');
                $images[] = $image_path;
                TemporaryImage::create([
                    'folder' => 'png',
                    'file' => $image_path,
                ]);
            }      
            return $images;
        }   
        return '';
    }
}
