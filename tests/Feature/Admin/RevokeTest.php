<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/admin/roles/1/permissions/1', 'delete');

it('fails if the user is normal user', function () {
    $role = Role::create(['name' => 'unknown user']);
    $user = User::factory()->create();
    $permission = Permission::create(['name' => 'user management']);

    actingAs($user)
        ->delete(route('admin.roles.permissions.destroy', [$role, $permission]))
        ->assertStatus(403);
});

it('fails if the user is not admin', function () {
    Role::create(['name' => 'moderator']);
    $moderator = User::factory()->create()->assignRole('moderator');
    $role = Role::create(['name' => 'unknown user']);
    $permission = Permission::create(['name' => 'user management']);

    actingAs($moderator)
        ->delete(route('admin.roles.permissions.destroy', [$role, $permission]))
        ->assertStatus(403);
});

it('allows admin user to revoke permission from a role', function () {
    $role1 = Role::create(['name' => 'admin']);
    $role2 = Role::create(['name' => 'unknown']);
    Permission::create(['name' => 'user management']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('user management');
    $permission = Permission::create(['name' => 'unknown user']);
    $role2->givePermissionTo('unknown user');
    
    // Act
    $response = actingAs($user)
        ->delete(route('admin.roles.permissions.destroy', [$role2, $permission]));
    
    // Assert the permission was revoked
    $role2->refresh();
    expect($role2->hasPermissionTo($permission))->toBeFalse();
    // Assert
    $response->assertRedirect(route('admin.roles.index'));
});
