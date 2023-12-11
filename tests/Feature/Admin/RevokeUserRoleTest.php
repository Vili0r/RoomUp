<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/admin/users/1/roles/1', 'delete');

it('fails if the user is normal user', function () {
    $role = Role::create(['name' => 'unknown user']);
    $user = User::factory()->create();

    actingAs($user)
        ->delete(route('admin.users.roles.destroy', [$user, $role]))
        ->assertStatus(403);
});

it('fails if the user is not admin', function () {
    Role::create(['name' => 'moderator']);
    $moderator = User::factory()->create()->assignRole('moderator');
    $user = User::factory()->create();
    $role = Role::create(['name' => 'unknown user']);

    actingAs($moderator)
        ->delete(route('admin.users.roles.destroy', [$user, $role]))
        ->assertStatus(403);
});

it('allows admin user to revoke role from a user', function () {
    $role1 = Role::create(['name' => 'admin']);
    $role2 = Role::create(['name' => 'unknown']);
    Permission::create(['name' => 'user management']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('user management');
    $user1 = User::factory()->create()->assignRole('unknown');
    
    // Act
    $response = actingAs($user)
        ->delete(route('admin.users.roles.destroy', [$user1, $role2]));
    
    // Assert the permission was revoked
    $user1->refresh();
    expect($user1->hasRole($role2))->toBeFalse();
    // Assert
    $response->assertRedirect(route('admin.users.index'));
});
