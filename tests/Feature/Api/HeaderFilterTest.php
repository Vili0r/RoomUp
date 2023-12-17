<?php

use App\Models\Roommate;
use App\Models\User;
use Faker\Factory as Faker;

it('returns paginated flats for the given search type', function () {
    $user = User::factory()->create();
    $faker = Faker::create();
    actingAs($user);
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

    $response = $this->getJson('/api/header-filter?search_type=flats');

    $response->assertStatus(200);
    $response->assertJsonStructure([
        'data' => [['id']], // Adjust according to your FlatSearchResultResource
        'pagination' => ['links'],
        'selectedPropertyQueries'
    ]);

    // Optionally, assert the count of flats in the response
    $responseData = $response->json('data');
    expect(count($responseData))->toBeLessThanOrEqual(6); // Assuming pagination is set to 6 items per page
});

it('returns paginated shared properties for the given search type', function () {
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

    $response = $this->getJson('/api/header-filter?search_type=shareds');

    $response->assertStatus(200);
    $response->assertJsonStructure([
        'data' => [['id']], // Adjust according to your FlatSearchResultResource
        'pagination' => ['links'],
        'selectedPropertyQueries'
    ]);

    // Optionally, assert the count of flats in the response
    $responseData = $response->json('data');
    expect(count($responseData))->toBeLessThanOrEqual(6);
});

it('returns paginated roommates for the given search type', function () {
    $user = User::factory()->create();
    actingAs($user);
    Roommate::factory()->count(10)->create([
        'user_id' => $user->id
    ]);

    $response = $this->getJson('/api/header-filter?search_type=roommate');

    $response->assertStatus(200);
    $response->assertJsonStructure([
        'data' => [['id']], // Adjust according to your FlatSearchResultResource
        'pagination' => ['links'],
        'selectedPropertyQueries'
    ]);

    // Optionally, assert the count of flats in the response
    $responseData = $response->json('data');
    expect(count($responseData))->toBeLessThanOrEqual(6);
});
