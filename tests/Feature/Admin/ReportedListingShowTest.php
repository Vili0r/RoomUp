<?php

use App\Models\Flat;
use App\Models\User;
use Faker\Factory as Faker;
use Inertia\Testing\AssertableInertia;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

uses(RefreshDatabase::class);

it('does not allow unauthenticated user to get reported listing show', function() {
    $response = $this->get(route('admin.reported-listings.show'));

    $response->assertStatus(302);
});

it('fails if the user is not admin', function () {
    $user = User::factory()->create();

    actingAs($user)
        ->get(route('admin.reported-listings.show'))
        ->assertStatus(403);
});

it('renders the reported listing show page', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'approve comments']);
    $role1->givePermissionTo('approve comments');
    $user = User::factory()->create()->assignRole('admin');
    
    actingAs($user);
    $faker = Faker::create();

    $data = [
        'contact_name' => $faker->firstName,
        'email' => $faker->email,
        'reason' => $faker->numberBetween(1, 10),
        'details' => $faker->sentence(5),
    ];

    actingAs($user);

    $flat = Flat::factory()->create([
        'user_id' => $user->id
    ]);

    $reported_listing = $flat->reported()->create([
        'owner_type' => 'flat',
        'owner_id' => $flat->id,
        'contact_name' => $data['contact_name'],
        'email' => $data['email'],
        'reason' => $data['reason'],
        'status' => 1,
        'details' => $data['details'],
    ]);

    // Act
    $response = $this->get(route('admin.reported-listings.show', $reported_listing));

    // Assert
    $response->assertInertia(
        fn (AssertableInertia $page) => $page
            ->component('Admin/Reported/Show')
            ->has('reportedListing') 
    );
});