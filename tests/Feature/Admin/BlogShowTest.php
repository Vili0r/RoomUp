<?php

use App\Models\Blog;
use App\Models\Category;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/admin/blogs/1', 'get');

it('fails if the user is not admin', function () {
    $user = User::factory()->create();
    $category = Category::factory(10)->create();
    
    actingAs($user);
    $blog = Blog::factory()->create([
        'category_id' => $category->random(),
        'author_id' => $user->id
    ]);

    actingAs($user)
        ->get(route('admin.blogs.show', $blog))
        ->assertStatus(403);
});

it('renders the blog show page for correct permission', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'create articles']);
    $role1->givePermissionTo('create articles');
    $user = User::factory()->create()->assignRole('admin');
    $category = Category::factory(10)->create();
    
    actingAs($user);
    $blog = Blog::factory()->create([
        'category_id' => $category->random(),
        'author_id' => $user->id
    ]);

    // Act
    $response = $this->get(route('admin.blogs.show', $blog));
    $response->assertStatus(200);
    // Assert
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Admin/Blog/Show')
        ->has('blog', fn (Assert $page) => $page
            ->where('id', $blog->id)
            ->where('image', $blog->image)
            ->where('title', $blog->title)
            ->where('published_at', $blog->published_at->format('Y-m-d'))
            ->etc()
        )
    );
});

it('does not render the blog show page for incorrect permission', function () {
    Role::create(['name' => 'admin']);
    $user = User::factory()->create()->assignRole('admin');
    $category = Category::factory(10)->create();
    
    actingAs($user);
    $blog = Blog::factory()->create([
        'category_id' => $category->random(),
        'author_id' => $user->id
    ]);
    
    actingAs($user)
        ->get(route('admin.blogs.show', $blog))
        ->assertStatus(403);
});

