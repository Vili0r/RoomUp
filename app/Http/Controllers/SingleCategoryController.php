<?php

namespace App\Http\Controllers;

use App\Http\Resources\Blog\BlogHomePageResource;
use App\Http\Resources\Blog\BlogHomePageRecentResource;
use App\Http\Resources\Blog\CategoryHomePageResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Blog;

class SingleCategoryController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Category $category, Request $request): Response
    {
        $category->load(['blogs']);
        
        return Inertia::render('Home/SingleCategory',[
            'recentBlogs' => BlogHomePageRecentResource::collection(Blog::latest()->take(3)->get()),
            'categories' => CategoryHomePageResource::collection(Category::take(3)->get()),
            'relatedBlogs' => BlogHomePageResource::collection(
                Blog::with(['author'])
                    ->where('category_id', $category->id)
                    ->latest()
                    ->paginate(10)
            ),
        ]);
    }
}
