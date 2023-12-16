<?php

use App\Models\User;
use Faker\Factory as Faker;
 
it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/api/roommates/1/edit', 'get');

it('fails if the roommate listing does not exist', function () {
    $user = User::factory()->create();
    actingAs($user)
        ->get('/api/roommates/1/edit')
        ->assertStatus(404);
});

it('fails if the user does not own the roommate listing', function () {
    $user = User::factory()->create();
    $anotherUser = User::factory()->create();
    actingAs($anotherUser);
    $faker = Faker::create();
    $roommate = $anotherUser->roommates()->create([
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

    actingAs($user)
        ->get('/api/roommates/'. $roommate->id .'/edit')
        ->assertStatus(403);
});

it('retrieves the listing to be edited', function (){
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

    $response = actingAs($user)
        ->get('/api/roommates/'. $roommate->id .'/edit');
    
    $response->assertStatus(200);
    $response->assertJsonStructure([
        'roommate' => [
            'id', 'availability', 'flatmate', 'advertiser', 'amenities', 'hobbies', // etc.
        ]
    ]);
});
