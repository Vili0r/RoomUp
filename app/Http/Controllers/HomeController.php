<?php

namespace App\Http\Controllers;

use App\Http\Resources\Blog\BlogHomePageRecentResource;
use App\Http\Resources\Blog\BlogHomePageResource;
use App\Http\Resources\Blog\BlogResource;
use App\Http\Resources\Blog\CategoryResource;
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
        return Inertia::render('Home/Blog',[
            'blogs' => BlogHomePageResource::collection(Blog::with(['author'])->latest()->paginate(10)),
            'recentBlogs' => BlogHomePageRecentResource::collection(Blog::latest()->take(3)->get()),
            'categories' => CategoryResource::collection(Category::take(3)->get()),
        ]);
    }
    
    public function aboutUs(): Response
    {
        return Inertia::render('Home/AboutUs');
    }
}
