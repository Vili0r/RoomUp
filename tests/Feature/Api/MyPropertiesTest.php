<?php

use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Testing\Fluent\AssertableJson;

it('renders the properties index page with search request', function () {
    $user = User::factory()->create();
    actingAs($user);
    $faker = Faker::create();

    for($i = 0; $i <= 4; $i++) {
        $user->flats()->create([
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
    }

    for($i = 0; $i <= 3; $i++) {
        $user->shareds()->create([
            'title' => 'Two bedroom'. $i,
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
    }

    // Act
    $response = $this->getJson('/api/my-properties', ['search' => 'Two bedroom']);

    // Assert
    $response->assertJson(fn (AssertableJson $json) => $json
        ->has('properties.data', 9) // Assuming there are 6 items in total
        ->has('filters')
        ->etc()
    );

    $response->assertJsonStructure([
        'properties' => [
            'data' => [
                '*' => [
                    // Define the expected structure of each property
                    'id', 'title', 'created_at', // etc.
                ]
            ],
            'links', // Pagination links
        ],
        'filters'
    ]);
});

it('tests unauthenticated user cannot retrieve properties', function () {
    // Act: Make a request to the API route without authenticating
    $response = $this->getJson('/api/my-properties');

    // Assert: Check that the response is a 401 Unauthorized
    $response->assertUnauthorized();
});
