<?php

namespace App\Http\Controllers;

use App\Http\Resources\Blog\BlogResource;
use App\Models\Blog;
use Inertia\Inertia;
use Inertia\Response;

class SingleBlogController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Blog $blog): Response
    {
        $blog->load(['author', 'category']);
        
        return Inertia::render('Home/SingleBlog',[
            'blog' => new BlogResource($blog),
        ]);
    }
}
