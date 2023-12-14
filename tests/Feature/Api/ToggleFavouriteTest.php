<?php

use Faker\Factory as Faker;
use App\Models\User;

it('adds a flat listing to the user\'s favorites if not already favorited', function () {
    $user = User::factory()->create();
    actingAs($user);
    $faker = Faker::create();
    $flat = $user->flats()->create([
        'title' => $faker->sentence(3),
        'description' => $faker->text(200), 
        'cost' => $faker->numberBetween(100, 1000), 
        'deposit' => $faker->numberBetween(50, 500), 
        'size' => $faker->numberBetween(1, 6), 
        'type' => $faker->numberBetween(1, 3), 
        'what_i_am' => $faker->numberBetween(1, 2), 
        'furnished' => $faker->numberBetween(1, 2), 
        'user_id' => $user->id, 
        'images' => ['image1.jpg', 'image2.jpg'],
    ]);

    actingAs($user)->post('/api/favourite/flat/' . $flat->id);

    expect($user->fresh()->favouriteFlats)->toHaveCount(1);
    expect($user->fresh()->favouriteFlats->first()->is($flat))->toBeTrue();
});

it('removes a flat listing from the user\'s favorites if already favorited', function () {
    $user = User::factory()->create();
    actingAs($user);
    $faker = Faker::create();
    $flat = $user->flats()->create([
        'title' => $faker->sentence(3),
        'description' => $faker->text(200), 
        'cost' => $faker->numberBetween(100, 1000), 
        'deposit' => $faker->numberBetween(50, 500), 
        'size' => $faker->numberBetween(1, 6), 
        'type' => $faker->numberBetween(1, 3), 
        'what_i_am' => $faker->numberBetween(1, 2), 
        'furnished' => $faker->numberBetween(1, 2), 
        'user_id' => $user->id, 
        'images' => ['image1.jpg', 'image2.jpg'],
    ]);
    $user->favouriteFlats()->attach($flat);

    actingAs($user)->post('/api/favourite/flat/' . $flat->id);

    expect($user->fresh()->favouriteFlats)->toHaveCount(0);
});

it('does not add a listing in the favourite if the incorrect model is provided', function () {
    $user = User::factory()->create();
    actingAs($user);
    $faker = Faker::create();
    $flat = $user->flats()->create([
        'title' => $faker->sentence(3),
        'description' => $faker->text(200), 
        'cost' => $faker->numberBetween(100, 1000), 
        'deposit' => $faker->numberBetween(50, 500), 
        'size' => $faker->numberBetween(1, 6), 
        'type' => $faker->numberBetween(1, 3), 
        'what_i_am' => $faker->numberBetween(1, 2), 
        'furnished' => $faker->numberBetween(1, 2), 
        'user_id' => $user->id, 
        'images' => ['image1.jpg', 'image2.jpg'],
    ]);
    $user->favouriteFlats()->attach($flat);

    $response = actingAs($user)
        ->post('/api/favourite/shared/' . $flat->id);

    $response->assertStatus(404);
});