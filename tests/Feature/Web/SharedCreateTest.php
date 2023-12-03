<?php

use App\Models\Amenity;
use App\Models\Shared;
use App\Models\TemporaryImage;
use App\Models\User;
use Faker\Factory as Faker;

beforeEach(fn () => $this->user = User::factory()->create());

it('does not allow unauthenticated user to store a shared listing', function() {
    $response = $this->post('/shared');
    $response->assertStatus(302);
});

it('creates a shared listing', function () {
    $amenities = Amenity::factory(10)->create();
    $faker = Faker::create();

    $relationData = [
        'amenities' => [
            ['id' => $amenities->random()->id],
            ['id' => $amenities->random()->id],
            ['id' => $amenities->random()->id],
        ],
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
        'rooms' => [
            [
                'room_size' => $faker->numberBetween(1, 2),
                'room_cost' => $faker->numberBetween(100, 1000),
                'room_deposit' => $faker->numberBetween(50, 500),
                'room_furnished' => $faker->numberBetween(1, 2),
                'room_references' => ['sometimes'],
                'available_from' => $faker->dateTimeBetween('tomorrow', '+1 year')->format('Y-m-d'),
                'minimum_stay' => $faker->numberBetween(1, 16),
                'maximum_stay' => $faker->numberBetween(1, 16),
                'days_available' => $faker->numberBetween(1, 3),
                'short_term' => $faker->optional()->boolean,
            ],
            [
                'room_size' => $faker->numberBetween(1, 2),
                'room_cost' => $faker->numberBetween(100, 1000),
                'room_deposit' => $faker->numberBetween(50, 500),
                'room_furnished' => $faker->numberBetween(1, 2),
                'room_references' => ['sometimes'],
                'available_from' => $faker->dateTimeBetween('tomorrow', '+1 year')->format('Y-m-d'),
                'minimum_stay' => $faker->numberBetween(1, 16),
                'maximum_stay' => $faker->numberBetween(1, 16),
                'days_available' => $faker->numberBetween(1, 3),
                'short_term' => $faker->optional()->boolean,
            ],
        ]
    ];

    $data = [
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
        'images' => []
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
        ->post('/shared', $mergedData);
    
    // Assert that the flat is stored in the database
    $this->assertDatabaseHas('shareds', [
        'title' => $data['title'],
        'description' => $data['description'],
        'available_rooms' => $data['available_rooms'],
        'size' => $data['size'],
        'type' => $data['type'], 
        'current_occupants' => $data['current_occupants'],
        'what_i_am' => $data['what_i_am'],
        'current_flatmate_age' => $data['current_flatmate_age'],
        'current_flatmate_smoker' => $data['current_flatmate_smoker'],
        'current_flatmate_pets' => $data['current_flatmate_pets'],
        'current_flatmate_occupation' => $data['current_flatmate_occupation'],
        'current_flatmate_gender' => $data['current_flatmate_gender'],
    ]);
    $sharedId = Shared::latest()->first()->id;

    // Assert that the shared property's amenities are stored in the database
    $this->assertDatabaseHas('amenity_shared', [
        'amenity_id' => $relationData['amenities'][0]['id'],
        'shared_id' => Shared::latest()->first()->id,
    ]);

    // Assert that the associated rooms are stored in the database
    for($i = 0; $i < 1; $i++) {
        $this->assertDatabaseHas('rooms', [
            'room_size' => $relationData['rooms'][$i]['room_size'],
            'room_cost' => $relationData['rooms'][$i]['room_cost'],
            'room_deposit' => $relationData['rooms'][$i]['room_deposit'],
            'room_furnished' => $relationData['rooms'][$i]['room_furnished'],
            'available_from' => $relationData['rooms'][$i]['available_from'],
            'minimum_stay' => $relationData['rooms'][$i]['minimum_stay'],
            'maximum_stay' => $relationData['rooms'][$i]['maximum_stay'],
            'days_available' => $relationData['rooms'][$i]['days_available'],
            'owner_type' => Shared::class,
            'owner_id' => Shared::latest()->first()->id,
        ]);
    }

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

    // Assert that the temporary images are deleted from the database
    foreach ($temporaryImages as $temporaryImage) {
        $this->assertDatabaseMissing('temporary_images', ['file' => $temporaryImage]);
    }

    $response->assertRedirect('/shared/'.$sharedId); 
});

it('validates the request details', function (){
    $data = [];

    actingAs($this->user)
        ->post('/shared', $data)->assertSessionHasErrors([
            'title',
            'description',
            'available_rooms',
            'size', 
            'type', 
            'current_occupants',
            'what_i_am',
            'images',
            'amenities',
            'address_1',
            'area',
            'city',
            'post_code',
            'long',
            'lat' ,
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
            'rooms'
        ]);
});

it('allows authenticated user to access create shared route', function() {
    $response = actingAs($this->user)
                ->get('/shared/create');

    $response->assertStatus(200);
});

it('deos not allow unauthenticated user to access create shared route', function() {
    $response = $this->get('/shared/create');

    $response->assertStatus(302);
});