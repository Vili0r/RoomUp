<?php

use App\Models\Flat;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

uses(RefreshDatabase::class);

it('fails if the user is not admin', function () {
    $user = User::factory()->create();
    actingAs($user);

    $faker = Faker::create();
    $flat = Flat::factory()->create([
        'user_id' => $user->id
    ]);

    $data = [
        'contact_name' => $faker->firstName,
        'email' => $faker->email,
        'reason' => $faker->numberBetween(1, 10),
        'details' => $faker->sentence(5),
    ];

    $reportedListing = $flat->reported()->create([
        'owner_type' => 'flat',
        'owner_id' => $flat->id,
        'contact_name' => $data['contact_name'],
        'email' => $data['email'],
        'reason' => $data['reason'],
        'status' => 1,
        'details' => $data['details'],
    ]);

    actingAs($user)
        ->put(route('admin.reported-listings.resolved', $reportedListing))
        ->assertStatus(403);
});

it('renders the properties resolved page without search request', function () {
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

    $reportedListing = $flat->reported()->create([
        'owner_type' => 'flat',
        'owner_id' => $flat->id,
        'contact_name' => $data['contact_name'],
        'email' => $data['email'],
        'reason' => $data['reason'],
        'status' => 1,
        'details' => $data['details'],
    ]);

    // Act
    $response = $this->put(route('admin.reported-listings.resolved', $reportedListing));

    $reportedListing->refresh();
    expect($reportedListing->resolved_at)->not->toBeNull();
    expect($reportedListing->status->value)->toEqual(3);

    // Assert: Check that the response is a redirect to the correct route
    $response->assertRedirect(route('admin.reported-listings.index'));
});