<?php

use App\Models\Blog;
use App\Models\Category;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;

it('renders the single blog page with the correct data', function () {
    Role::create(['name' => 'admin']);
    $user = User::factory()->create()->assignRole('admin');
    Category::factory(10)->create();
    $category = Category::factory()->create();
    
    actingAs($user);
    Blog::factory(5)->create([
        'category_id' => $category->id,
        'author_id' => $user->id
    ]); 
    
    $blog = Blog::factory()->create([
        'category_id' => $category->id,
        'author_id' => $user->id
    ]);

    // Act: Call the __invoke method
    $response = $this->get(route('single.blog.show', $blog));

    $response->assertStatus(200);
    // Assert
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Home/SingleBlog')
        ->has('blog', fn (Assert $page) => $page
            ->where('id', $blog->id)
            ->where('image', $blog->image)
            ->where('title', $blog->title)
            ->where('published_at', $blog->published_at->format('Y-m-d'))
            ->etc()
        )
        ->has('categories', 3)
        ->has('relatedBlogs', 3)
    );
});