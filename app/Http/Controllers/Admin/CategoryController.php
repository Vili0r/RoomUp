<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Blog\CategoryIndexResource;
use App\Http\Resources\Blog\CategoryResource;
use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Response;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $categories = CategoryIndexResource::collection(
            Category::query()
                ->withCount(['blogs'])
                ->when($request->input('search'), function($query, $search) {
                    $query->where('name', 'like', "%{$search}%");
                })
                ->latest()
                ->paginate(7)
        );

        return Inertia::render('Admin/Category/Index', [
            'categories' => $categories,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $this->authorize('create articles');
        
        return Inertia::render('Admin/Category/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $this->authorize('create articles');

        $request->validate([
            'name' => ['required', 'min:3', 'max:20'],
        ]);

        Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->input('name')),
        ]);

        return to_route('admin.categories.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category): Response
    {
        $this->authorize('edit articles');

        return Inertia::render('Admin/Category/Edit', [
            'category' => new CategoryResource($category),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $this->authorize('edit articles');

        $request->validate([
            'name' => ['required', 'min:3', 'max:20'],
        ]);

        $category->update([
            'name' => $request->name,
            'slug' => Str::slug($request->input('name')),
        ]);

        return to_route('admin.categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $this->authorize('delete articles');
        $category->delete();

        return to_route('admin.categories.index');
    }
}
