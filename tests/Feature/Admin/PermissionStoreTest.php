<?php

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/admin/permissions', 'post');

it('fails if the user is normal user', function () {
    $user = User::factory()->create();
    actingAs($user)
        ->post('/admin/permissions')
        ->assertStatus(403);
});

it('fails if the user is not admin', function () {
    Role::create(['name' => 'moderator']);
    $moderator = User::factory()->create()->assignRole('moderator');

    actingAs($moderator)
        ->post('/admin/permissions')
        ->assertStatus(403);
});

it('validates the request details', function (){
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'user management']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('user management');

    actingAs($user)
        ->post('/admin/permissions')->assertSessionHasErrors([
            'name',
        ]);
});

it('stores the permission', function () {
    uses(RefreshDatabase::class);
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'user management']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('user management');

    actingAs($user)
        ->post('/admin/permissions', [
            'name' => 'unknown',
        ]);

    $this->assertDatabaseHas('permissions', [
        'name' => 'unknown',
    ]);
});
