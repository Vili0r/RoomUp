<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/admin/roles/1', 'put');

it('fails if the user is normal user', function () {
    $role = Role::create(['name' => 'unknown user']);
    $user = User::factory()->create();

    actingAs($user)
        ->put(route('admin.roles.update', $role))
        ->assertStatus(403);
});

it('fails if the user is not admin', function () {
    Role::create(['name' => 'moderator']);
    $moderator = User::factory()->create()->assignRole('moderator');
    $role = Role::create(['name' => 'unknown user']);

    actingAs($moderator)
        ->put(route('admin.roles.update', $role))
        ->assertStatus(403);
});

it('renders the permission edit page', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'user management']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('user management');
    $permission = Permission::create(['name' => 'unknown user']);
    
    // Act
    $response = actingAs($user)
        ->get(route('admin.permissions.edit', $permission));
    $response->assertStatus(200);
    // Assert
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Admin/Permission/Edit')
        ->has('permission')
    );
});

it('validates the request details', function (){
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'user management']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('user management');
    $permission = Permission::create(['name' => 'unknown user']);

    actingAs($user)
        ->put(route('admin.permissions.update', $permission))->assertSessionHasErrors([
            'name',
        ]);
});

it('stores the permission', function () {
    uses(RefreshDatabase::class);
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'user management']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('user management');
    $permission = Permission::create(['name' => 'unknown user']);

    $response = actingAs($user)
        ->put(route('admin.permissions.update', $permission), [
            'name' => 'unknown user updated',
        ]);

    $this->assertDatabaseHas('permissions', [
        'name' => 'unknown user updated',
    ]);

    $response->assertRedirect();
});
