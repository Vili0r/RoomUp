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
    ->expectGuest()->toBeRedirectedFor('/admin/blogs/1', 'put');

it('fails if the user is not admin', function () {
    $user = User::factory()->create();
    $category = Category::factory(10)->create();
    
    actingAs($user);
    $blog = Blog::factory()->create([
        'category_id' => $category->random(),
        'author_id' => $user->id
    ]);

    actingAs($user)
        ->get(route('admin.blogs.edit', $blog))
        ->assertStatus(403);
});

it('renders the blog edit page for correct permission', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'edit articles']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('edit articles');
    $category = Category::factory(10)->create();
    
    actingAs($user);
    $blog = Blog::factory()->create([
        'category_id' => $category->random(),
        'author_id' => $user->id
    ]);

    // Act
    $response = $this->get(route('admin.blogs.edit', $blog));
    $response->assertStatus(200);
    // Assert
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Admin/Blog/Edit')
        ->has('blog', fn (Assert $page) => $page
            ->where('id', $blog->id)
            ->where('image', $blog->image)
            ->where('title', $blog->title)
            ->where('published_at', $blog->published_at->format('Y-m-d'))
            ->etc()
        )
        ->has('categories', 10) 
    );
});

it('does not render the blog edit page for incorrect permission', function () {
    Role::create(['name' => 'admin']);
    $user = User::factory()->create()->assignRole('admin');
    $category = Category::factory(10)->create();
    
    actingAs($user);
    $blog = Blog::factory()->create([
        'category_id' => $category->random(),
        'author_id' => $user->id
    ]);
    
    actingAs($user)
        ->get(route('admin.blogs.edit', $blog))
        ->assertStatus(403);
});

it('validates the request details', function (){
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'edit articles']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('edit articles');
    $category = Category::factory(10)->create();
    
    actingAs($user);
    $blog = Blog::factory()->create([
        'category_id' => $category->random(),
        'author_id' => $user->id
    ]);

    actingAs($user)
        ->put(route('admin.blogs.update', $blog))->assertSessionHasErrors([
            'title',
            'body',
            'published_at',
            'category_id',
        ]);
});

it('updates the blog', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'edit articles']);
    $role1->givePermissionTo('edit articles');
    $user = User::factory()->create()->assignRole('admin');
    $faker = Faker::create();
    $category = Category::factory()->create();
    
    actingAs($user);
    $blog = Blog::factory()->create([
        'category_id' => $category->id,
        'author_id' => $user->id
    ]);

    $title = $faker->sentence(4);
    $data = [
        'title' => $title,
        'body' => $faker->text(200),
        'published_at' => $faker->dateTimeBetween('now + 2 days', 'now + 1 year')->format('Y-m-d'),
        'slug' => Str::slug($title),
        'author_id' => $user->id, 
        'category_id' => $category->id 
    ];

    $response = actingAs($user)
        ->put(route('admin.blogs.update', $blog), $data);

    $this->assertDatabaseHas('blogs', [
        'title' => $data['title'], 
        'slug' => $data['slug'], 
        'body' => $data['body'],
        'author_id' => $user->id, 
        'category_id' => $category->id  
    ]);

    $response->assertRedirect('/admin/blogs');
});
