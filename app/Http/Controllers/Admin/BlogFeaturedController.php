<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class BlogFeaturedController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Blog $blog): RedirectResponse
    {
        $request->validate([
            'featured' => ['sometimes'],
        ]);
        
        if($request->featured != $blog->featured){
            $isFeatured = $blog->featured;
            $blog->update([
                'featured' => !$isFeatured
            ]);
        }

        $blog->save();

        return back();
    }
}
