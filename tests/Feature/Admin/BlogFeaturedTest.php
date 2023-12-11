<?php

use App\Models\Blog;
use Faker\Factory as Faker;
use Illuminate\Support\Str;
use App\Models\Category;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/admin/blog/1/featured', 'put');

it('fails if the user is not admin', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create();
    
    actingAs($user);
    $blog = Blog::factory()->create([
        'category_id' => $category->id,
        'author_id' => $user->id
    ]);

    actingAs($user)
        ->put(route('admin.blog.featured', $blog))
        ->assertStatus(403);
});

it('toggles the featured functionality of blog', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'publish articles']);
    $role1->givePermissionTo('publish articles');
    $user = User::factory()->create()->assignRole('admin');
    $category = Category::factory()->create();
    
    actingAs($user);
    $blog = Blog::factory()->create([
        'category_id' => $category->id,
        'author_id' => $user->id
    ]);

    $response = $this->put(route('admin.blog.featured', $blog), [
        'featured' => '1',
    ]);

    $response->assertRedirect();
    expect($blog->fresh()->featured)->toEqual(1);
});
