<?php

use Carbon\Carbon;
use App\Models\User;
use Faker\Factory as Faker;

it('updates room listing live_at when provided with a valid date after today', function () {
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

    $dateAfterToday = Carbon::now()->addDay()->format('Y-m-d');

    $response = $this->put(route('shared.availability', $shared), [
        'live_at' => $dateAfterToday,
    ]);

    $response->assertRedirect();
    expect($shared->fresh()->live_at->format('Y-m-d'))->toBe($dateAfterToday);
});

it('fails to update shared listing live_at when provided with a date before today', function () {
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

    $dateBeforeToday = Carbon::now()->subDay()->format('Y-m-d');

    $response = $this->put(route('shared.availability', $shared), [
        'live_at' => $dateBeforeToday,
    ]);

    $response->assertSessionHasErrors(['live_at']);
});

it('does not update shared listing live_at when it is not provided', function () {
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

    $response = $this->put(route('shared.availability', $shared), []);

    $response->assertRedirect();
    expect($shared->fresh()->live_at)->toBeNull();
});

it('toggles the availability of the shared listing', function () {
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

    $response = $this->put(route('shared.availability', $shared), [
        'available' => '0',
    ]);

    $response->assertRedirect();
    expect($shared->fresh()->available)->toEqual(0);
});

