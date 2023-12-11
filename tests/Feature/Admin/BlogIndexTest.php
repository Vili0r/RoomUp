<?php

use App\Models\Blog;
use App\Models\Category;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/admin/blogs', 'get');

it('fails if the user is not admin', function () {
    $user = User::factory()->create();
    actingAs($user)
        ->get('/admin/blogs')
        ->assertStatus(403);
});

it('renders the blog index page with search request', function () {
    Role::create(['name' => 'admin']);
    $user = User::factory()->create()->assignRole('admin');
    $category = Category::factory(10)->create();
    
    actingAs($user);
    Blog::factory(5)->create([
        'category_id' => $category->random(),
        'author_id' => $user->id
    ]);

    // Act
    $response = $this->get(route('admin.blogs.index', ['search' => 'House']));
    $response->assertStatus(200);
    // Assert
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Admin/Blog/Index')
        ->has('blogs.data', 5) // Assuming there are 6 items in total
        ->has('filters', fn (Assert $page) => $page
            ->where('search', 'House') // Assert that the search term is present in the filters
            ->etc()
        )
    );
});

