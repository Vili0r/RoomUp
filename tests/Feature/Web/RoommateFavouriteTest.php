<?php

use Faker\Factory as Faker;
use App\Models\User;

it('adds a roommate listing to the user\'s favorites if not already favorited', function () {
    $user = User::factory()->create();
    actingAs($user);
    $faker = Faker::create();
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

    actingAs($user);

    $response = $this->post(route('roommate.favourite.store', $roommate->id));

    $response->assertRedirect();
    expect($user->fresh()->favouriteRoommates)->toHaveCount(1);
    expect($user->fresh()->favouriteRoommates->first()->is($roommate))->toBeTrue();
});

it('removes a roommate listing from the user\'s favorites if already favorited', function () {
    $user = User::factory()->create();
    actingAs($user);
    $faker = Faker::create();
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
    $user->favouriteRoommates()->attach($roommate);

    $response = $this->post(route('roommate.favourite.store', $roommate->id));

    $response->assertRedirect();
    expect($user->fresh()->favouriteRoommates)->toHaveCount(0);
});
