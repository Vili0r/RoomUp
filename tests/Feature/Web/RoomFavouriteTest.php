<?php

use Faker\Factory as Faker;
use App\Models\User;

it('adds a room listing to the user\'s favorites if not already favorited', function () {
    $user = User::factory()->create();
    actingAs($user);
    $faker = Faker::create();
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
        'room_cost' => $faker->numberBetween(100, 1000),
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

    actingAs($user);

    $response = $this->post(route('room.favourite.store', $room->id));

    $response->assertRedirect();
    expect($user->fresh()->favouriteRooms)->toHaveCount(1);
    expect($user->fresh()->favouriteRooms->first()->is($room))->toBeTrue();
});

it('removes a room listing from the user\'s favorites if already favorited', function () {
    $user = User::factory()->create();
    actingAs($user);
    $faker = Faker::create();
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
        'room_cost' => $faker->numberBetween(100, 1000),
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
    $user->favouriteRooms()->attach($room);

    $response = $this->post(route('room.favourite.store', $room->id));

    $response->assertRedirect();
    expect($user->fresh()->favouriteRooms)->toHaveCount(0);
});
