<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/admin/users/1/permissions/1', 'delete');

it('fails if the user is normal user', function () {
    $user = User::factory()->create();
    $permission = Permission::create(['name' => 'user management']);

    actingAs($user)
        ->delete(route('admin.users.permissions.destroy', [$user, $permission]))
        ->assertStatus(403);
});

it('fails if the user is not admin', function () {
    Role::create(['name' => 'moderator']);
    $moderator = User::factory()->create()->assignRole('moderator');
    $permission = Permission::create(['name' => 'user management']);
    $user = User::factory()->create();

    actingAs($moderator)
        ->delete(route('admin.users.permissions.destroy', [$user, $permission]))
        ->assertStatus(403);
});

it('allows admin user to revoke permission from a user', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'user management']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('user management');
    $user1 = User::factory()->create();
    $permission = Permission::create(['name' => 'unknown user']);
    $user1->givePermissionTo('unknown user');
    
    // Act
    $response = actingAs($user)
        ->delete(route('admin.users.permissions.destroy', [$user1, $permission]));
    
    // Assert the permission was revoked
    $user1->refresh();
    expect($user1->hasPermissionTo($permission))->toBeFalse();
    // Assert
    $response->assertRedirect(route('admin.users.index'));
});
