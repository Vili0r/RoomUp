<?php

namespace App\Http\Controllers;

use App\Http\Resources\Blog\BlogHomePageRecentResource;
use App\Http\Resources\Blog\BlogHomePageResource;
use App\Http\Resources\Blog\BlogFeaturedCarouselResource;
use App\Http\Resources\Blog\CategoryHomePageResource;
use App\Models\Blog;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    public function welcome(): Response
    {
        return Inertia::render('Home/Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }
    
    public function blog(): Response
    {
        $blogQuery = Blog::with(['author']);

        return Inertia::render('Home/Blog',[
            'blogs' => BlogHomePageResource::collection($blogQuery->latest()->paginate(10)),
            'recentBlogs' => BlogHomePageRecentResource::collection(Blog::latest()->take(3)->get()),
            'featuredBlogs' => BlogFeaturedCarouselResource::collection($blogQuery->featured()->latest()->take(6)->get()),
            'categories' => CategoryHomePageResource::collection(Category::take(3)->get()),
        ]);
    }
    
    public function aboutUs(): Response
    {
        return Inertia::render('Home/AboutUs');
    }
}
