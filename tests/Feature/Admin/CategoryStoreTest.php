<?php

use Faker\Factory as Faker;
use Illuminate\Support\Str;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/admin/categories', 'post');

it('fails if the user is not admin', function () {
    $user = User::factory()->create();
    actingAs($user)
        ->post('/admin/categories')
        ->assertStatus(403);
});

it('renders the category create page for correct permission', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'create articles']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('create articles');
    
    // Act
    $response = actingAs($user)->get(route('admin.categories.create'));
    $response->assertStatus(200);
    // Assert
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Admin/Category/Create')
    );
});

it('does not render the category create page for incorrect permission', function () {
    Role::create(['name' => 'admin']);
    $user = User::factory()->create()->assignRole('admin');
    
    actingAs($user)
        ->get(route('admin.categories.create'))
        ->assertStatus(403);
});

it('validates the request details', function (){
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'create articles']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('create articles');

    actingAs($user)
        ->post('/admin/categories')->assertSessionHasErrors([
            'name',
        ]);
});

it('stores the category', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'create articles']);
    $role1->givePermissionTo('create articles');
    $user = User::factory()->create()->assignRole('admin');
    $faker = Faker::create();

    $name = $faker->text(20);
    $data = [
        'name' => $name,
        'slug' => Str::slug($name),
    ];

    $response = actingAs($user)
        ->post('/admin/categories', $data);

    $this->assertDatabaseHas('categories', [
        'name' => $data['name'], 
        'slug' => $data['slug'], 
    ]);

    $response->assertRedirect('/admin/categories');
});
