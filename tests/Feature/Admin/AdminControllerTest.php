<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/admin', 'get');

it('fails if the user is not admin', function () {
    $user = User::factory()->create();
    actingAs($user)
        ->get('/admin')
        ->assertStatus(403);
});

it('returns the admin dashboard if it is admin', function () {
    // Create a user and authenticate them
    Role::create(['name' => 'admin']);
    $admin = User::factory()->create()->assignRole('admin');
    
    $response = actingAs($admin)->get(route('admin.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Admin/Index')
    );
});

it('returns the admin dashboard if it is moderator', function () {
    // Create a user and authenticate them
    Role::create(['name' => 'moderator']);
    $moderator = User::factory()->create()->assignRole('moderator');
    
    $response = actingAs($moderator)->get(route('admin.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Admin/Index')
    );
});
