<?php

use App\Models\Blog;
use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

it('can destroy blog', function () {
    Storage::fake('public');
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'delete articles']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('delete articles');
    $category = Category::factory()->create();

    // Act as the user
    actingAs($user);
    $blog = Blog::factory()->create([
        'category_id' => $category->id,
        'author_id' => $user->id
    ]);
    
    // Store a fake image to delete
    Storage::disk('public')->put($blog->image, 'Fake image content');

    // Act: Make a DELETE request to the destroy route
    $response = $this->delete(route('admin.blogs.destroy', $blog));

    // Assert: Check that the response is a redirect to the index route
    Storage::disk('public')->assertMissing($blog->image);
    
    // Assert: Check that the blog post was deleted
    $this->assertDatabaseMissing('blogs', ['id' => $blog->id]);

    $response->assertRedirect('/admin/blogs');
});
