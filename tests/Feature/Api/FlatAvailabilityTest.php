<?php

use Carbon\Carbon;
use App\Models\User;
use Faker\Factory as Faker;

it('does give an error if incorrect model is passed', function () {
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

    $response = $this->put('/api/availability/shared/'. $flat->id, []);

    $response->assertStatus(404);
});

it('updates flat listing live_at when provided with a valid date after today', function () {
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
    $dateAfterToday = Carbon::now()->addDay()->format('Y-m-d');

    $response = $this->put('/api/availability/flat/'. $flat->id, [
        'live_at' => $dateAfterToday,
    ]);

    $response->assertOk();
    expect($flat->fresh()->live_at->format('Y-m-d'))->toBe($dateAfterToday);
});

it('fails to update flat listing live_at when provided with a date before today', function () {
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
    $dateBeforeToday = Carbon::now()->subDay()->format('Y-m-d');

    $response = $this->put('/api/availability/flat/'. $flat->id, [
        'live_at' => $dateBeforeToday,
    ]);

    $response->assertSessionHasErrors(['live_at']);
});

it('does not update flat listing live_at when it is not provided', function () {
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

    $response = $this->put('/api/availability/flat/'. $flat->id, []);

    $response->assertOk();
    expect($flat->fresh()->live_at)->toBeNull();
});

it('toggles the availability of the flat listing', function () {
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

    $response = $this->put('/api/availability/flat/'. $flat->id, [
        'available' => '0',
    ]);

    $response->assertOk();
    expect($flat->fresh()->available)->toEqual(0);
});

