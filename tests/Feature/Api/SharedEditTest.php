<?php

use App\Models\Amenity;
use App\Models\User;
use Faker\Factory as Faker;
use App\Models\TemporaryImage;
 
it('redirects unauthenticated users in api edit route')
    ->expectGuest()->toBeRedirectedFor('/api/shareds/1/edit', 'get');


it('fails if the shared listing does not exist', function () {
    $user = User::factory()->create();
    actingAs($user)
        ->get('/api/shareds/1/edit')
        ->assertStatus(404);
});

it('fails if the user does not own the shared listing', function () {
    $user = User::factory()->create();
    $anotherUser = User::factory()->create();
    actingAs($anotherUser);
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

    actingAs($user)
        ->get('/api/shareds/'. $shared->id .'/edit')
        ->assertStatus(403);
});

it('returns the shared listing to be updated', function () {
    $user = User::factory()->create();
    $anotherUser = User::factory()->create();
    actingAs($anotherUser);
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
        'room_size' => $faker->numberBetween(1, 2),
        'room_cost' => $faker->numberBetween(100, 1000),
        'room_deposit' => $faker->numberBetween(50, 500),
        'room_furnished' => $faker->numberBetween(1, 2),
        'available_from' => $faker->dateTimeBetween('tomorrow', '+1 year')->format('Y-m-d'),
        'minimum_stay' => $faker->numberBetween(1, 7),
        'maximum_stay' => $faker->numberBetween(8, 16),
        'days_available' => $faker->numberBetween(1, 3),
        'short_term' => $faker->boolean,
        'owner_type' => Shared::class,
        'owner_id' => $shared->id,
    ]);

    $response = actingAs($anotherUser)
        ->get('/api/shareds/'. $shared->id .'/edit');
    
    $response->assertStatus(200);
    $response->assertJsonStructure([
        'shared' => [
            'id', 'amenities', 'advertiser', 'address', 'transport', 'flatmate', 'rooms', // etc.
        ]
    ]);
});
