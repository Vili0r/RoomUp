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

    $dateAfterToday = Carbon::now()->addDay()->format('Y-m-d');

    $response = $this->put(route('room.availability', $room), [
        'live_at' => $dateAfterToday,
    ]);

    $response->assertRedirect();
    expect($room->fresh()->live_at->format('Y-m-d'))->toBe($dateAfterToday);
});

it('fails to update room listing live_at when provided with a date before today', function () {
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

    $dateBeforeToday = Carbon::now()->subDay()->format('Y-m-d');

    $response = $this->put(route('room.availability', $room), [
        'live_at' => $dateBeforeToday,
    ]);

    $response->assertSessionHasErrors(['live_at']);
});

it('does not update room listing live_at when it is not provided', function () {
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


    $response = $this->put(route('room.availability', $room), []);

    $response->assertRedirect();
    expect($room->fresh()->live_at)->toBeNull();
});

it('toggles the availability of the room listing', function () {
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


    $response = $this->put(route('room.availability', $room), [
        'available' => '0',
    ]);

    $response->assertRedirect();
    expect($room->fresh()->available)->toEqual(0);
});

