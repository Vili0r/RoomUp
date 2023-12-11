<?php

use App\Models\Blog;
use Faker\Factory as Faker;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use App\Models\Category;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/admin/blogs', 'post');

it('fails if the user is not admin', function () {
    $user = User::factory()->create();
    actingAs($user)
        ->post('/admin/blogs')
        ->assertStatus(403);
});

it('renders the blog create page for correct permission', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'create articles']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('create articles');
    Category::factory(10)->create();
    
    actingAs($user);

    // Act
    $response = $this->get(route('admin.blogs.create'));
    $response->assertStatus(200);
    // Assert
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Admin/Blog/Create')
        ->has('categories', 10) 
    );
});

it('does not render the blog create page for incorrect permission', function () {
    Role::create(['name' => 'admin']);
    $user = User::factory()->create()->assignRole('admin');
    Category::factory(10)->create();
    
    actingAs($user)
        ->get(route('admin.blogs.create'))
        ->assertStatus(403);
});

it('validates the request details', function (){
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'create articles']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('create articles');
    Category::factory(10)->create();

    actingAs($user)
        ->post('/admin/blogs')->assertSessionHasErrors([
            'image',
            'title',
            'body',
            'published_at',
            'category_id',
        ]);
});

it('stores the blog', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'create articles']);
    $role1->givePermissionTo('create articles');
    $user = User::factory()->create()->assignRole('admin');
    $category = Category::factory()->create();
    $faker = Faker::create();

    $image = UploadedFile::fake()->image('blog.jpg');
    $title = $faker->sentence(4);
    $data = [
        'title' => $title,
        'body' => $faker->text(200),
        'published_at' => $faker->dateTimeBetween('now + 2 days', 'now + 1 year')->format('Y-m-d'),
        'slug' => Str::slug($title),
        'image' => $image,
        'author_id' => $user->id, 
        'category_id' => $category->id 
    ];

    $response = actingAs($user)
        ->post('/admin/blogs', $data);

    $blogPost = Blog::where('title', $data['title'])->first();

    $this->assertNotNull($blogPost);
    $this->assertEquals($data['title'], $blogPost->title);
    $this->assertEquals($data['body'], $blogPost->body);
    $this->assertEquals(Str::slug($data['title']), $blogPost->slug);
    $this->assertNotNull($blogPost->published_at);

    $response->assertRedirect('/admin/blogs');
});
