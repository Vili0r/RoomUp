<?php

namespace App\Http\Controllers;

use App\Http\Resources\Blog\BlogHomePageResource;
use App\Http\Resources\Blog\BlogDetailsResource;
use App\Http\Resources\Blog\CategoryResource;
use App\Models\Blog;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class SingleBlogController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Blog $blog): Response
    {
        $blog->load(['author']);
        
        return Inertia::render('Home/SingleBlog',[
            'blog' => new BlogDetailsResource($blog),
            'categories' => CategoryResource::collection(Category::take(3)->get()),
            'relatedBlogs' => BlogHomePageResource::collection(
                Blog::where('category_id', $blog->category->id)->latest()->take(3)->get()
            ),
        ]);
    }
}
