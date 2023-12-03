<?php

use App\Models\Amenity;
use App\Models\Room;
use App\Models\Shared;
use App\Models\User;
use Faker\Factory as Faker;
use App\Models\TemporaryImage;

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/shared/1', 'put');

it('fails if the shared listing does not exist', function () {
    $user = User::factory()->create();
    actingAs($user)
        ->put('/shared/1')
        ->assertStatus(404);
});

it('fails if the user does not own the shared listing', function () {
    $user = User::factory()->create();
    $anotherUser = User::factory()->create();
    actingAs($anotherUser);
    $faker = Faker::create();
    $shared = $anotherUser->shareds()->create([
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
        ->get('/shared/'. $shared->id .'/edit')
        ->assertStatus(403);
});

it('validates the request details', function () {
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

    actingAs($user)
        ->put('/shared/'. $shared->id)
        ->assertSessionHasErrors([
            'title',
            'description',
            'available_rooms',
            'size', 
            'type', 
            'current_occupants',
            'what_i_am',
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
            'rooms'
        ]);
});

it('validates the incorrect request details', function () {
    $amenities = Amenity::factory(10)->create();
    $user = User::factory()->create();
    actingAs($user);
    $faker = Faker::create();
    $shared = $user->shareds()->create([
        'title' => $faker->sentence(2),
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

    $relationData = [
        'amenities' => [
            ['id' => $amenities->random()->id],
            ['id' => $amenities->random()->id],
            ['id' => $amenities->random()->id],
        ],
        'address_1' => $faker->streetAddress,
        'address_2' => $faker->optional()->secondaryAddress,
        'area' => $faker->sentence(1),
        'city' => $faker->city,
        'post_code' => $faker->numberBetween(100000, 999999),
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
        'new_flatmate_min_age' => 17,
        'new_flatmate_max_age' => 17,
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
                'minimum_stay' => $faker->numberBetween(7, 16),
                'maximum_stay' => $faker->numberBetween(1, 6),
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
                'minimum_stay' => $faker->numberBetween(1, 7),
                'maximum_stay' => $faker->numberBetween(8, 16),
                'days_available' => $faker->numberBetween(1, 3),
                'short_term' => $faker->optional()->boolean,
            ],
        ]
    ];
    
    $newData = [
        'title' => 'Updated title', 
        'description' => 'Updated DescriptionQuia sit eius impedit impedit. Nostrum perspiciatis voluptatem illum ipsa nisi omnis quia qui. Corporis ad est maxime numquam nostrum dignissimos.', 
        'available_rooms' => 3,
        'size' => 4, 
        'type' => 1, 
        'current_occupants' => 2,
        'what_i_am' => 1,
        'current_flatmate_age' => 19,
        'current_flatmate_smoker' => 1,
        'current_flatmate_pets' => 2,
        'current_flatmate_occupation' => 1,
        'current_flatmate_gender' => 2, 
        'images' => ['imageUPD1.jpg', 'imageUPD2.jpg'],
    ];
    $mergedData = array_merge($relationData, $newData);

    actingAs($user)
        ->put('/shared/'. $shared->id, $mergedData)
        ->assertSessionHasErrors([
            'available_rooms',
            'new_flatmate_min_age',
            'new_flatmate_max_age',
            'rooms.*.maximum_stay'
        ]);
});

it('updates the shared listing', function () {
    $amenities = Amenity::factory(10)->create();
    $user = User::factory()->create();
    actingAs($user);
    $faker = Faker::create();
    $shared = $user->shareds()->create([
        'title' => $faker->sentence(2),
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

    $shared->rooms()->create([
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

    $relationData = [
        'amenities' => [
            ['id' => $amenities->random()->id],
            ['id' => $amenities->random()->id],
            ['id' => $amenities->random()->id],
        ],
        'address_1' => '16 Efterpis',
        'address_2' => $faker->optional()->secondaryAddress,
        'area' => $faker->city,
        'city' => $faker->city,
        'post_code' => $faker->numberBetween(100000, 999999),
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
        'new_flatmate_min_age' => $faker->numberBetween(18, 30),
        'new_flatmate_max_age' => $faker->numberBetween(31, 35),
        'new_flatmate_smoker' => $faker->numberBetween(1, 2),
        'new_flatmate_pets' => $faker->numberBetween(1, 2),
        'new_flatmate_references' => $faker->optional()->numberBetween(1, 2),
        'new_flatmate_couples' => $faker->optional()->boolean,
        'new_flatmate_gender' => $faker->numberBetween(1, 3),
        'new_flatmate_occupation' => $faker->numberBetween(1, 3),
        'rooms' => [
            [
                'id' => Room::latest()->first()->id,
                'room_size' => 2,
                'room_cost' => 1000,
                'room_deposit' => 500,
                'room_furnished' => 1,
                'available_from' => $faker->dateTimeBetween('tomorrow', '+1 year')->format('Y-m-d'),
                'minimum_stay' => 7,
                'maximum_stay' => 16,
                'days_available' => 3,
                'short_term' => $faker->boolean,
            ],
            [
                'room_size' => 1,
                'room_cost' => 500,
                'room_deposit' => 200,
                'room_furnished' => 2,
                'available_from' => $faker->dateTimeBetween('tomorrow', '+1 year')->format('Y-m-d'),
                'minimum_stay' => 4,
                'maximum_stay' => 8,
                'days_available' => 1,
                'short_term' => $faker->boolean,
            ],
        ]
    ];
    
    $newData = [
        'title' => 'Updated title', 
        'description' => 'Updated DescriptionQuia sit eius impedit impedit. Nostrum perspiciatis voluptatem illum ipsa nisi omnis quia qui. Corporis ad est maxime numquam nostrum dignissimos.', 
        'available_rooms' => 2,
        'size' => 4, 
        'type' => 1, 
        'current_occupants' => 2,
        'what_i_am' => 1,
        'current_flatmate_age' => 19,
        'current_flatmate_smoker' => 1,
        'current_flatmate_pets' => 2,
        'current_flatmate_occupation' => 1,
        'current_flatmate_gender' => 2, 
        'images' => ['imageUPD1.jpg', 'imageUPD2.jpg'],
    ];

    $images = $shared->images;
    foreach ($newData['images'] as $temporaryImage) {
        $image_path = 'images/' . $temporaryImage;
        TemporaryImage::factory()->create([
            'file' => $temporaryImage,
            'folder' => 'png' 
        ]);
       array_push($images, $image_path);
    }

    $mergedData = array_merge($relationData, $newData);
    
    actingAs($user)
        ->put('/shared/'. $shared->id, $mergedData);
    
    // Assert that the flat is stored in the database
    $this->assertDatabaseHas('shareds', [
        'id' => $shared->id,
        'title' => 'Updated title', 
        'description' => 'Updated DescriptionQuia sit eius impedit impedit. Nostrum perspiciatis voluptatem illum ipsa nisi omnis quia qui. Corporis ad est maxime numquam nostrum dignissimos.', 
        'available_rooms' => 2,
        'size' => 4, 
        'type' => 1, 
        'current_occupants' => 2,
        'what_i_am' => 1,
        'current_flatmate_age' => 19,
        'current_flatmate_smoker' => 1,
        'current_flatmate_pets' => 2,
        'current_flatmate_occupation' => 1,
        'current_flatmate_gender' => 2, 
    ]);

    //Assert that the associated rooms are stored in the database
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

    // Assert that the temporary image is deleted
    foreach ($newData['images'] as $temporaryImage) {
        $this->assertDatabaseMissing('temporary_images', ['file' => $temporaryImage]);
        $this->assertFileDoesNotExist(public_path('image/' . $temporaryImage));
    }
});