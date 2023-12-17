<?php

use App\Models\Flat;
use App\Models\Room;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Support\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('renders the home search page with search request', function () {
    $user = User::factory()->create();
    actingAs($user);
    $faker = Faker::create();

    for($i = 0; $i <= 2; $i++) {
        $user->flats()->create([
            'title' => 'ipsa',
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
    }

    $shared = $user->shareds()->create([
        'title' => 'ipsa',
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

    for($i = 0; $i <= 5; $i++) {
        $shared->rooms()->create([
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
    }

    // Act
    $response = $this->getJson('/api/home-search?search=ipsa');
    $response->assertStatus(200);
    
    // Assert
    $response->assertJsonStructure([
        'data' => [
            '*' => [
                // Define the expected structure for each property
                'id', // etc.
            ]
        ],
        'links', // Pagination links
    ]);

    // Optionally, assert the count of properties in the response
    $responseData = $response->json('data');
    expect(count($responseData))->toEqual(3); 
});
