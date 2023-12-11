<?php

use App\Http\Resources\Blog\CommentIndexResource;
use App\Models\Blog;
use App\Models\Category;
use Faker\Factory as Faker;
use App\Models\User;

it('validates the request details', function (){
    // Arrange: Create a blog with comments
    $user = User::factory()->create();
    $category = Category::factory()->create();
    
    actingAs($user);
    $blog = Blog::factory()->create([
        'category_id' => $category->id,
        'author_id' => $user->id
    ]);

    actingAs($user)
        ->post(route('blogs.comments.store', $blog))->assertSessionHasErrors([
            'name',
            'email',
            'content',
        ]);
});

it('stores a comment for a blog', function () {
    // Arrange: Create a blog with comments
    $user = User::factory()->create();
    $category = Category::factory()->create();
    $faker = Faker::create();
    
    actingAs($user);
    $blog = Blog::factory()->create([
        'category_id' => $category->id,
        'author_id' => $user->id
    ]);

    $data = [
        'name' => $faker->firstName(),
        'email' => $faker->email(),
        'content' => $faker->text(200),
    ];

    // Act: Make a GET request to the index route
    $response = $this->postJson(route('blogs.comments.store', $blog), $data);

    // Assert
    $response->assertJsonStructure([
        'id',
        'content',
        'name',
        'approved',
        'created_at',
    ]);

    $this->assertDatabaseHas('comments', [
        'blog_id' => $blog->id,
        'name' => $data['name'],
        'email' => $data['email'],
        'content' => $data['content'],
    ]);
});

