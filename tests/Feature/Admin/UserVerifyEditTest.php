<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/admin/user/1/verification/edit', 'get');

it('fails if the user is normal user', function () {
    $user = User::factory()->create();
    actingAs($user)
        ->get('/admin/user/1/verification/edit')
        ->assertStatus(403);
});

it('fails if the user is not admin', function () {
    Role::create(['name' => 'moderator']);
    $moderator = User::factory()->create()->assignRole('moderator');

    actingAs($moderator)
        ->get('/admin/user/'.$moderator->id.'/verification/edit')
        ->assertStatus(403);
});

it('fails if the user has not the right permission', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'user']);
    $role1->givePermissionTo('user');
    $user = User::factory()->create()->assignRole('admin');

    actingAs($user)
        ->get('/admin/user/'.$user->id.'/verification/edit')
        ->assertStatus(403);
});

it('renders the user verification edti page with search request', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'user management']);
    $role1->givePermissionTo('user management');
    $user = User::factory()->create()->assignRole('admin');

    actingAs($user);

    // Act
    $response = $this->get(route('admin.user.verification.edit', $user));
    $response->assertStatus(200);
    // Assert
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Admin/Verify/Edit')
        ->has('user') // Assuming there are 6 items in total
    );
});