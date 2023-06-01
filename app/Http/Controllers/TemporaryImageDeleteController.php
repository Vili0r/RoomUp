<?php

namespace App\Http\Controllers;

use App\Models\TemporaryImage;
use Illuminate\Support\Facades\Storage;

class TemporaryImageDeleteController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke($folder)
    {
        $folderData = json_decode($folder, true);
        $file = $folderData['file'];
        $temporaryImage = TemporaryImage::where('file', $file)->first();

        if ($temporaryImage){
            Storage::delete('public/image/' . $temporaryImage->file);
            $temporaryImage->delete();
        }

        return '';
    }
}
