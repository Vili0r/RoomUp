<?php

use App\Http\Resources\Blog\CommentIndexResource;
use App\Models\Blog;
use App\Models\Category;
use App\Models\Comment;
use App\Models\User;


it('returns a collection of approved comments for a blog', function () {
    // Arrange: Create a blog with comments
    $user = User::factory()->create();
    $category = Category::factory()->create();
    
    actingAs($user);
    $blog = Blog::factory()->create([
        'category_id' => $category->id,
        'author_id' => $user->id
    ]);

    $approvedComments = Comment::factory()->count(3)->state(['approved' => true])->create(['blog_id' => $blog->id]);
    $unapprovedComments = Comment::factory()->count(2)->state(['approved' => false])->create(['blog_id' => $blog->id]);

    // Act: Make a GET request to the index route
    $response = $this->getJson(route('blogs.comments.index', $blog));

    // Assert: Check that the response status is 200 OK
    $response->assertStatus(200);

    $expectedResourceResponse = CommentIndexResource::collection($approvedComments)->response()->getData(true);
    $response->assertJson($expectedResourceResponse);

    // Assert: Check that only approved comments are returned
    $response->assertJsonCount(3);
    $response->assertJsonMissing(['id' => $unapprovedComments->first()->id]);
});

