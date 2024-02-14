<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/admin/user/verification', 'get');

it('fails if the user is normal user', function () {
    $user = User::factory()->create();
    actingAs($user)
        ->get('/admin/user/verification')
        ->assertStatus(403);
});

it('fails if the user is not admin', function () {
    Role::create(['name' => 'moderator']);
    $moderator = User::factory()->create()->assignRole('moderator');

    actingAs($moderator)
        ->get('/admin/user/verification')
        ->assertStatus(403);
});

it('fails if the user has not the right permission', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'user']);
    $role1->givePermissionTo('user');
    $user = User::factory()->create()->assignRole('admin');

    actingAs($user)
        ->get('/admin/user/verification')
        ->assertStatus(403);
});

it('renders the user verification index page with search request', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'user management']);
    $role1->givePermissionTo('user management');
    $user = User::factory()->create()->assignRole('admin');

    actingAs($user);

    // Act
    $response = $this->get(route('admin.user.verification.index', ['search' => 'Vilior']));
    $response->assertStatus(200);
    // Assert
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Admin/Verify/Index')
        ->has('users.data', 0) // Assuming there are 6 items in total
        ->has('filters', fn (Assert $page) => $page
            ->where('search', 'Vilior') // Assert that the search term is present in the filters
            ->etc()
        )
    );
});