<?php

use Carbon\Carbon;
use App\Models\User;
use Faker\Factory as Faker;

it('updates roommate listing live_at when provided with a valid date after today', function () {
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

    $dateAfterToday = Carbon::now()->addDay()->format('Y-m-d');

    $response = $this->put(route('roommate.availability', $roommate), [
        'live_at' => $dateAfterToday,
    ]);

    $response->assertRedirect();
    expect($roommate->fresh()->live_at->format('Y-m-d'))->toBe($dateAfterToday);
});

it('fails to update roommate listing live_at when provided with a date before today', function () {
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

    $dateBeforeToday = Carbon::now()->subDay()->format('Y-m-d');

    $response = $this->put(route('roommate.availability', $roommate), [
        'live_at' => $dateBeforeToday,
    ]);

    $response->assertSessionHasErrors(['live_at']);
});

it('does not update roommatemate listing live_at when it is not provided', function () {
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


    $response = $this->put(route('roommate.availability', $roommate), []);

    $response->assertRedirect();
    expect($roommate->fresh()->live_at)->toBeNull();
});

it('toggles the availability of the roommate listing', function () {
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


    $response = $this->put(route('roommate.availability', $roommate), [
        'available' => '0',
    ]);

    $response->assertRedirect();
    expect($roommate->fresh()->available)->toEqual(0);
});

