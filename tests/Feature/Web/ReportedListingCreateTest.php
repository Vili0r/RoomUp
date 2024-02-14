<?php

use App\Models\Flat;
use Inertia\Testing\AssertableInertia;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('returns the reported listing create page for flat', function () {
    $owner = User::factory()->create();
    $faker = Faker::create();

    actingAs($owner);
    $flat = Flat::factory()->create([
        'user_id' => $owner->id
    ]);

    $response = $this->get("/reported-listings/create?type=flat&id={$flat->id}");

    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('Reported/Create')
        ->has('property')
        ->has('reasons')
    );
});

it('returns the reported listing create page for room', function () {
    $user = User::factory()->create();
    $faker = Faker::create();

    actingAs($user);
    $shared = $user->shareds()->create([
        'title' => "I don't know",
        'description' => $faker->text(200),
        'available_rooms' => $faker->numberBetween(1, 10),
        'size' => $faker->numberBetween(1, 6), 
        'type' => $faker->numberBetween(1, 3), 
        'current_occupants' => $faker->numberBetween(0, 10),
        'what_i_am' => $faker->numberBetween(1, 2),
        'current_flatmate_age' => $faker->numberBetween(18, 60),
        'current_flatmate_smoker' => $faker->numberBetween(1, 2),
        'current_flatmate_pets' => $faker->numberBetween(1, 2),
        'current_flatmate_occupation' => $faker->numberBetween(1, 2),
        'current_flatmate_gender' => $faker->numberBetween(1, 2),
        'user_id' => $user->id, 
        'images' => ['image1.jpg', 'image2.jpg'],
    ]);

    $room = $shared->rooms()->create([
        'sub_title' => $faker->text(5),
        'sub_description' => $faker->text(20),
        'room_size' => $faker->numberBetween(1, 2),
        'room_cost' => 100,
        'room_deposit' => $faker->numberBetween(50, 500),
        'room_furnished' => $faker->numberBetween(1, 2),
        'available_from' => $faker->dateTimeBetween('tomorrow', '+1 year')->format('Y-m-d'),
        'minimum_stay' => $faker->numberBetween(1, 7),
        'maximum_stay' => $faker->numberBetween(8, 16),
        'days_available' => $faker->numberBetween(1, 3),
        'short_term' => false,
        'owner_type' => Shared::class,
        'owner_id' => $shared->id,
    ]);

    $response = $this->get("/reported-listings/create?type=room&id={$room->id}");

    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('Reported/Create')
        ->has('property')
        ->has('reasons')
    );
});

it('returns the reported listing create page for roommate', function () {
    $user = User::factory()->create();
    $faker = Faker::create();

    actingAs($user);
    $roommate = $user->roommates()->create([
        'title' => $faker->text(5),
        'description' => $faker->text(200),
        'budget' => $faker->numberBetween(100, 1000),
        'searching_for' => $faker->numberBetween(1, 3),
        'room_size' => $faker->numberBetween(1, 2),
        'age' => $faker->numberBetween(18, 30),
        'smoker' => $faker->numberBetween(1, 2),
        'pets' => $faker->numberBetween(1, 2),
        'occupation' => $faker->numberBetween(1, 2),
        'gender' => $faker->numberBetween(1, 2),
        'area' => $faker->city,
        'city' => $faker->city,
        'user_id' => $user->id, 
        'images' => ['image1.jpg', 'image2.jpg'],
    ]);

    $response = $this->get("/reported-listings/create?type=roommate&id={$roommate->id}");

    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('Reported/Create')
        ->has('property')
        ->has('reasons')
    );
});

