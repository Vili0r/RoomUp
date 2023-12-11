<?php

use App\Models\Category;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/admin/categories', 'get');

it('fails if the user is not admin', function () {
    $user = User::factory()->create();
    actingAs($user)
        ->get('/admin/categories')
        ->assertStatus(403);
});

it('renders the category index page with search request', function () {
    Role::create(['name' => 'admin']);
    $user = User::factory()->create()->assignRole('admin');
    Category::factory(5)->create();
    
    // Act
    $response = actingAs($user)
        ->get(route('admin.categories.index', ['search' => 'House']));

    $response->assertStatus(200);
    // Assert
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Admin/Category/Index')
        ->has('categories.data', 5) // Assuming there are 6 items in total
        ->has('filters', fn (Assert $page) => $page
            ->where('search', 'House') // Assert that the search term is present in the filters
            ->etc()
        )
    );
});

