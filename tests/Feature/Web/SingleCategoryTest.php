<?php

use App\Models\Blog;
use App\Models\Category;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;

it('renders the single category page with the correct data', function () {
    Role::create(['name' => 'admin']);
    $user = User::factory()->create()->assignRole('admin');
    Category::factory(10)->create();
    $category = Category::factory()->create();
    
    actingAs($user);
    Blog::factory(5)->create([
        'category_id' => $category->id,
        'author_id' => $user->id
    ]); 

    // Act: Call the __invoke method
    $response = $this->get(route('single.category.show', $category));

    $response->assertStatus(200);
    // Assert
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Home/SingleCategory')
        ->has('recentBlogs', 3)
        ->has('categories', 3)
        ->has('relatedBlogs.data', 5)
    );
});