<?php

use App\Models\Amenity;
use App\Models\User;
use Faker\Factory as Faker;
use App\Models\TemporaryImage;
 
it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/api/flats/1/edit', 'get');

it('fails if the flat listing does not exist', function () {
    $user = User::factory()->create();
    actingAs($user)
        ->get('/api/flats/1/edit')
        ->assertStatus(404);
});

it('fails if the user does not own the flat listing', function () {
    $user = User::factory()->create();
    $anotherUser = User::factory()->create();
    actingAs($anotherUser);
    $faker = Faker::create();
    $flat = $anotherUser->flats()->create([
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

    actingAs($user)
        ->get('/api/flats/'. $flat->id .'/edit')
        ->assertStatus(403);
});

it('returns the flat to be updated', function () {
    $user = User::factory()->create();
    $anotherUser = User::factory()->create();
    actingAs($anotherUser);
    $faker = Faker::create();
    $flat = $anotherUser->flats()->create([
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

    $response = actingAs($anotherUser)
        ->get('/api/flats/'. $flat->id .'/edit');
    
    $response->assertStatus(200);
    $response->assertJsonStructure([
        'flat' => [
            'id', 'amenities', 'advertiser', 'address', 'transport', 'flatmate', 'availability', // etc.
        ]
    ]);
});

