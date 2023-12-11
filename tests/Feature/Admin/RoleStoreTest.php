<?php

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/admin/roles', 'post');

it('fails if the user is normal user', function () {
    $user = User::factory()->create();
    actingAs($user)
        ->post('/admin/roles')
        ->assertStatus(403);
});

it('fails if the user is not admin', function () {
    Role::create(['name' => 'moderator']);
    $moderator = User::factory()->create()->assignRole('moderator');

    actingAs($moderator)
        ->post('/admin/roles')
        ->assertStatus(403);
});

it('validates the request details', function (){
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'user management']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('user management');

    actingAs($user)
        ->post('/admin/roles')->assertSessionHasErrors([
            'name',
        ]);
});

it('stores the role', function () {
    uses(RefreshDatabase::class);
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'user management']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('user management');

    actingAs($user)
        ->post('/admin/roles', [
            'name' => 'unknown',
        ]);

    $this->assertDatabaseHas('roles', [
        'name' => 'unknown',
    ]);
});
