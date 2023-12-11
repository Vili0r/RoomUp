<?php

use Faker\Factory as Faker;
use Illuminate\Support\Str;
use App\Models\Category;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/admin/categories/1', 'put');

it('fails if the user is not admin', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create();

    actingAs($user)
        ->get(route('admin.categories.edit', $category))
        ->assertStatus(403);
});

it('renders the category edit page for correct permission', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'edit articles']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('edit articles');
    
    actingAs($user);
    $category = Category::factory()->create();

    // Act
    $response = $this->get(route('admin.categories.edit', $category));
    $response->assertStatus(200);
    // Assert
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Admin/Category/Edit')
        ->has('category', fn (Assert $page) => $page
            ->where('id', $category->id)
            ->where('name', $category->name)
            ->etc()
        )
    );
});

it('does not render the category edit page for incorrect permission', function () {
    Role::create(['name' => 'admin']);
    $user = User::factory()->create()->assignRole('admin');
    
    actingAs($user);
    $category = Category::factory()->create();
    
    actingAs($user)
        ->get(route('admin.categories.edit', $category))
        ->assertStatus(403);
});

it('validates the request details', function (){
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'edit articles']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('edit articles');
    $category = Category::factory()->create();

    actingAs($user)
        ->put(route('admin.categories.update', $category))->assertSessionHasErrors([
            'name',
        ]);
});

it('updates the category', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'edit articles']);
    $role1->givePermissionTo('edit articles');
    $user = User::factory()->create()->assignRole('admin');
    $faker = Faker::create();
    
    actingAs($user);
    $category = Category::factory()->create();

    $name = $faker->text(20);
    $data = [
        'name' => $name,
        'slug' => Str::slug($name),
    ];

    $response = actingAs($user)
        ->put(route('admin.categories.update', $category), $data);

    $this->assertDatabaseHas('categories', [
        'name' => $data['name'], 
        'slug' => $data['slug'], 
    ]);

    $response->assertRedirect('/admin/categories');
});
