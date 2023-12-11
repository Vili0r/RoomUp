<?php

use App\Models\Blog;
use Faker\Factory as Faker;
use App\Models\Category;
use App\Models\Comment;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

it('fails if the user is not admin', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create();
    
    actingAs($user);
    $blog = Blog::factory()->create([
        'category_id' => $category->id,
        'author_id' => $user->id
    ]);

    $comment = Comment::factory()
        ->state(['approved' => true])
        ->create([
            'blog_id' => $blog->id
        ]);

    actingAs($user)
        ->put(route('admin.blogs.comments.update', [$blog, $comment]))
        ->assertStatus(403);
});

it('destroys the comment of a blog', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'delete comments']);
    $role1->givePermissionTo('delete comments');
    $user = User::factory()->create()->assignRole('admin');
    
    actingAs($user);
    $category = Category::factory()->create();

    $blog = Blog::factory()->create([
        'category_id' => $category->id,
        'author_id' => $user->id
    ]);

    $comment = Comment::factory()
        ->state(['approved' => true])
        ->create([
            'blog_id' => $blog->id
        ]);

    $response = actingAs($user)
        ->delete(route('admin.blogs.comments.destroy', [$blog, $comment]));

    // Assert: Check that the blog post was deleted
    $this->assertDatabaseMissing('comments', ['id' => $comment->id]);
    $response->assertRedirect(route('admin.comments.index'));
});
