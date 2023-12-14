<?php

use Inertia\Testing\AssertableInertia as Assert;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Support\Str;
use Illuminate\Testing\Fluent\AssertableJson;

it('returns the viewed listings of the authenticated user', function () {
    $user = User::factory()->create();
    $faker = Faker::create();
    actingAs($user);
    $addressData = [
        'address_1' => $faker->streetAddress,
        'address_2' => $faker->optional()->secondaryAddress,
        'area' => $faker->city,
        'city' => $faker->city,
        'post_code' => $faker->postcode,
        'long' => $faker->randomFloat(7, -180, 180),
        'lat' => $faker->randomFloat(7, -180, 180),
    ];
    $advertiserData = [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'display_last_name' => $faker->boolean,
        'telephone' => $faker->phoneNumber,
        'display_telephone' => $faker->boolean,
    ];
    $availabilityData = [
        'available_from' => $faker->dateTimeBetween('tomorrow', '+1 year')->format('Y-m-d'),
        'minimum_stay' => $faker->numberBetween(1, 7),
        'maximum_stay' => $faker->numberBetween(8, 16),
        'days_available' => $faker->numberBetween(1, 3),
        'short_term' => false,
    ];

    $flat = $user->flats()->create([
        'title' => $faker->sentence(3),
        'description' => $faker->text(55), 
        'cost' => $faker->numberBetween(100, 1000), 
        'deposit' => $faker->numberBetween(50, 500), 
        'size' => 1, 
        'type' => $faker->numberBetween(1, 3), 
        'what_i_am' => $faker->numberBetween(1, 2), 
        'furnished' => $faker->numberBetween(1, 2), 
        'user_id' => $user->id, 
        'images' => ['image1.jpg', 'image2.jpg'],
    ]);
    
    $shared = $user->shareds()->create([
        'title' => "I don't know",
        'description' => $faker->text(55),
        'available_rooms' => $faker->numberBetween(1, 10),
        'size' => 1, 
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
    $roommate = $user->roommates()->create([
        'title' => $faker->sentence(2),
        'description' => $faker->text(200),
        'budget' => $faker->numberBetween(100, 1000),
        'searching_for' => 2,
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
    
    $flat->address()->create($addressData);
    $flat->advertiser()->create($advertiserData);
    $flat->availability()->create($availabilityData);
    $shared->address()->create($addressData);
    $shared->advertiser()->create($advertiserData);
    $roommate->advertiser()->create($advertiserData);

    // Simulate the user favoriting a flat and a room.
    $user->viewedFlats()->attach($flat, [
        'count' => 1,
        'updated_at' => now()
    ]);
    $user->viewedRooms()->attach($room, [
        'count' => 1,
        'updated_at' => now()
    ]);

    $response = $this->get('/api/viewed');

    $response->assertStatus(200);
    $response->assertJsonStructure([
        '*' => [
            'id', 'model', 'title', 'cost', 'images', 'favouritedBy', 
            'address_1', 'area', 'first_name', 'views'
        ]
    ]);

    // Optionally, assert the limit of properties returned
    $responseData = $response->json();
    expect($responseData)->toHaveCount(2);
    expect(count($responseData))->toBeLessThanOrEqual(10);
});
