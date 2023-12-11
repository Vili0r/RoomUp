<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Faker\Factory as Faker;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/admin/users/1', 'put');

it('fails if the user is normal user', function () {
    $user = User::factory()->create();
    $user1 = User::factory()->create();

    actingAs($user)
        ->put(route('admin.users.update', $user1))
        ->assertStatus(403);
});

it('fails if the user is not admin', function () {
    Role::create(['name' => 'moderator']);
    $moderator = User::factory()->create()->assignRole('moderator');
    $user1 = User::factory()->create();

    actingAs($moderator)
        ->put(route('admin.users.update', $user1))
        ->assertStatus(403);
});

it('renders the user edit page', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'user management']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('user management');
    $user1 = User::factory()->create();
    
    // Act
    $response = actingAs($user)->get(route('admin.users.edit', $user1));
    $response->assertStatus(200);
    // Assert
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Admin/User/Edit')
        ->has('user')
        ->has('roles')
        ->has('permissions')
    );
});

it('validates the request details', function (){
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'user management']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('user management');
    $user1 = User::factory()->create();

    actingAs($user)
        ->put(route('admin.users.update', $user1))->assertSessionHasErrors([
            'first_name',
            'last_name',
            'email',
            'gender',
            'birthdate',
            'looking_for',
        ]);
});

it('stores the user', function () {
    uses(RefreshDatabase::class);
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'user management']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('user management');
    $faker = Faker::create();
    $user1 = User::factory()->create();

    actingAs($user);
    $birthdate = Carbon::now()->subYears(19)->format('Y-m-d');
    $data = [
        'first_name' => $faker->firstName(),
        'last_name' => $faker->lastName(),
        'email' => $faker->unique()->safeEmail(),
        'email_verified_at' => now(),
        'gender' => 'male',
        'birthdate' => $birthdate,
        'looking_for' => 'I have a flat or house share',
        'password' => 'L3NHn8!989',
        'password_confirmation' => 'L3NHn8!989',
        'remember_token' => Str::random(10),
    ];

    $response = actingAs($user)
        ->put(route('admin.users.update', $user1), $data);

    $this->assertDatabaseHas('users', [
        'first_name' => $data['first_name'],
        'last_name' => $data['last_name'],
        'email' => $data['email'],
        'gender' => 'male',
        'birthdate' => $birthdate,
        'looking_for' => 'I have a flat or house share', 
    ]);

    $response->assertRedirect('/admin/users');
});