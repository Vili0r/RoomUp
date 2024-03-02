<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BlogStoreRequest;
use App\Http\Requests\BlogUpdateRequest;
use App\Http\Resources\Blog\BlogEditResource;
use Illuminate\Http\Request;
use App\Http\Resources\Blog\BlogIndexResource;
use App\Http\Resources\Blog\BlogShowResource;
use App\Http\Resources\Blog\CategoryResource;
use App\Models\Blog;
use App\Models\Category;
use Inertia\Response;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $blogs = BlogIndexResource::collection(
            Blog::query()
                ->with(['author', 'category'])
                ->when($request->input('search'), function($query, $search) {
                    $query->where('title', 'like', "%{$search}%");
                })
                ->latest()
                ->paginate(7)
        );

        return Inertia::render('Admin/Blog/Index', [
            'blogs' => $blogs,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $this->authorize('create articles');

        return Inertia::render('Admin/Blog/Create',[
            'categories' => CategoryResource::collection(Category::all()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BlogStoreRequest $request): RedirectResponse
    {
        $this->authorize('create articles');

        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('blogs');

            // Convert the content to UTF-8 if it's not already
            $utf8_body = mb_convert_encoding($request->body, 'UTF-8', 'UTF-8');

            Blog::create([
                'title' => $request->title,
                'body' => $utf8_body,
                'published_at' => $request->published_at,
                'category_id' => $request->category_id,
                'slug' => Str::slug($request->input('title')),
                'author_id' => auth()->id(),
                'image' => $image,
            ]);
        }

        return to_route('admin.blogs.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog): Response
    {
        $this->authorize('create articles');

        return Inertia::render('Admin/Blog/Show', [
            'blog' => new BlogShowResource($blog),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog): Response
    {
        $this->authorize('edit articles');

        $blog->load(['author', 'category']);

        return Inertia::render('Admin/Blog/Edit', [
            'blog' => new BlogEditResource($blog),
            'categories' => CategoryResource::collection(Category::all()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BlogUpdateRequest $request, Blog $blog): RedirectResponse
    {
        $this->authorize('edit articles');

        $image = $blog->image;

        if ($request->hasFile('image')) {
            Storage::delete($image);
            $image = $request->file('image')->store('blogs');
        }
        
        $blog->update([
            'title' => $request->title,
            'body' => $request->body,
            'published_at' => $request->published_at,
            'category_id' => $request->category_id,
            'slug' => Str::slug($request->input('title')),
            'author_id' => auth()->id(),
            'image' => $image,
        ]);

        return to_route('admin.blogs.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog): RedirectResponse
    {
        $this->authorize('delete articles');
        
        Storage::delete($blog->image);

        $blog->delete();

        return to_route('admin.blogs.index');
    }
}
