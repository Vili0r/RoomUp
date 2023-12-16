<?php

use App\Models\Amenity;
use App\Models\TemporaryImage;
use App\Models\User;
use Faker\Factory as Faker;

beforeEach(fn () => $this->user = User::factory()->create());

it('does not allow unauthenticated user to store a flat listing', function() {
    $response = $this->post('/api/flats');

    $response->assertStatus(302);
});

it('validates the request details', function (){

    actingAs($this->user)
        ->post('/api/flats')->assertSessionHasErrors([
            'title',
            'description',
            'cost',
            'deposit',
            'size',
            'type',
            'what_i_am',
            'furnished',
            'images',
            'amenities',
            'address_1',
            'area',
            'city',
            'post_code',
            'minutes',
            'mode',
            'station',
            'first_name',
            'last_name',
            'telephone',
            'new_flatmate_min_age',
            'new_flatmate_max_age',
            'new_flatmate_smoker',
            'new_flatmate_gender',
            'new_flatmate_occupation',
            'available_from',
            'minimum_stay',
            'maximum_stay',
            'days_available', 
        ]);
});

it('creates a flat lisitng', function () {
    Amenity::factory(10)->create();
    $faker = Faker::create();

    $relationData = [
        'amenities' => [1, 4, 5],
        'address_1' => $faker->streetAddress,
        'address_2' => $faker->optional()->secondaryAddress,
        'area' => $faker->city,
        'city' => $faker->city,
        'post_code' => $faker->postcode,
        'long' => $faker->randomFloat(7, -180, 180),
        'lat' => $faker->randomFloat(7, -180, 180),
        'minutes' => $faker->numberBetween(1, 5),
        'mode' => $faker->numberBetween(1, 4),
        'station' => $faker->numberBetween(1, 10),
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'display_last_name' => $faker->optional()->boolean,
        'telephone' => $faker->phoneNumber,
        'display_telephone' => $faker->optional()->boolean,
        'new_flatmate_min_age' => $faker->numberBetween(18, 60),
        'new_flatmate_max_age' => $faker->numberBetween(18, 60),
        'new_flatmate_smoker' => $faker->numberBetween(1, 2),
        'new_flatmate_pets' => $faker->numberBetween(1, 2),
        'new_flatmate_references' => $faker->optional()->numberBetween(1, 2),
        'new_flatmate_couples' => $faker->optional()->boolean,
        'new_flatmate_gender' => $faker->numberBetween(1, 3),
        'new_flatmate_occupation' => $faker->numberBetween(1, 3),
        'available_from' => $faker->dateTimeBetween('tomorrow', '+1 year')->format('Y-m-d'),
        'minimum_stay' => $faker->numberBetween(1, 16),
        'maximum_stay' => $faker->numberBetween(1, 16),
        'days_available' => $faker->numberBetween(1, 3),
        'short_term' => $faker->optional()->boolean,
    ];

    $data = [
        'title' => 'I dont know',
        'description' => $faker->text(200),
        'cost' => $faker->numberBetween(100, 1000),
        'deposit' => $faker->numberBetween(50, 500), 
        'size' => $faker->numberBetween(1, 6), 
        'type' => $faker->numberBetween(1, 3), 
        'live_at' => now(), 
        'what_i_am' => $faker->numberBetween(1, 2), 
        'furnished' => $faker->numberBetween(1, 2), 
        'featured' => $faker->boolean(),
        'available' => $faker->boolean(),
        'user_id' => $this->user->id, 
    ];

    // Mock the file storage and create temporary images
    $temporaryImages = ['image1.jpg', 'image2.jpg'];
    foreach ($temporaryImages as $temporaryImage) {
        TemporaryImage::factory()->create([
            'file' => $temporaryImage,
            'folder' => 'png' 
        ]);
    }

    $data['images'] = $temporaryImages;

    $mergedData = array_merge($relationData, $data);
    $response = actingAs($this->user)
        ->postJson('/api/flats', $mergedData);

    // Assert that the flat is stored in the database
    $this->assertDatabaseHas('flats', [
        'title' => 'I dont know',
        'description' => $data['description'],
        'cost' => $data['cost'],
        'deposit' => $data['deposit'],
        'size' => $data['size'],
        'type' => $data['type'],
        'what_i_am' => $data['what_i_am'],
        'furnished' => $data['furnished'],
    ]);

    // Assert that the flat's address is stored in the database
    $this->assertDatabaseHas('addresses', [
        'address_1' => $relationData['address_1'],
        'address_2' => $relationData['address_2'],
        'area' => $relationData['area'],
        'city' => $relationData['city'],
    ]);

    // Assert that the flat's advertiser is stored in the database
     $this->assertDatabaseHas('advertisers', [
        'first_name' => $relationData['first_name'],
        'last_name' => $relationData['last_name'],
        'telephone' => $relationData['telephone'],
    ]);

    // Assert that the flat's transport is stored in the database
    $this->assertDatabaseHas('transports', [
        'minutes' => $relationData['minutes'],
        'mode' => $relationData['mode'],
        'station' => $relationData['station'],
    ]);

    // Assert that the flat's flatmate is stored in the database
    $this->assertDatabaseHas('flatmates', [
        'new_flatmate_min_age' => intval($relationData['new_flatmate_min_age']),
        'new_flatmate_max_age' => $relationData['new_flatmate_max_age'],
        'new_flatmate_smoker' => $relationData['new_flatmate_smoker'],
        'new_flatmate_pets' => $relationData['new_flatmate_pets'],
        'new_flatmate_occupation' => $relationData['new_flatmate_occupation'],
        'new_flatmate_gender' => $relationData['new_flatmate_gender'],
    ]);

    // Assert that the flat's availability is stored in the database
    $this->assertDatabaseHas('availabilities', [
        'available_from' => $relationData['available_from'],
        'minimum_stay' => $relationData['minimum_stay'],
        'maximum_stay' => $relationData['maximum_stay'],
        'days_available' => $relationData['days_available'],
    ]);

    // Assert that the temporary images are deleted from the database
    foreach ($temporaryImages as $temporaryImage) {
        $this->assertDatabaseMissing('temporary_images', ['file' => $temporaryImage]);
    }

    $response->assertStatus(201);
});