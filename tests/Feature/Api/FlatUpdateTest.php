<?php

use App\Models\Amenity;
use App\Models\User;
use Faker\Factory as Faker;
use App\Models\TemporaryImage;
 
it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/api/flats/1', 'put');

it('fails if the flat listing does not exist', function () {
    $user = User::factory()->create();
    actingAs($user)
        ->put('/api/flats/1')
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

it('validates the request details', function () {
    $user = User::factory()->create();
    actingAs($user);
    $faker = Faker::create();
    $flat = $user->flats()->create([
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
        ->put('/api/flats/'. $flat->id)
        ->assertSessionHasErrors([
            'title',
            'description',
            'cost',
            'deposit',
            'size',
            'type',
            'what_i_am',
            'furnished',
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

it('updates the flat listing', function () {
    $amenities = Amenity::factory(10)->create();
    $user = User::factory()->create();
    actingAs($user);
    $faker = Faker::create();
    $flat = $user->flats()->create([
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

    $relationData = [
        'amenities' => $amenities->random(),
        'address_1' => "16 Efterpis",
        'address_2' => $faker->optional()->secondaryAddress,
        'area' => $faker->city,
        'city' => $faker->city,
        'post_code' => $faker->numberBetween(10000, 999999),
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
        'new_flatmate_min_age' => $faker->numberBetween(18, 23),
        'new_flatmate_max_age' => $faker->numberBetween(24, 34),
        'new_flatmate_smoker' => $faker->numberBetween(1, 2),
        'new_flatmate_pets' => $faker->numberBetween(1, 2),
        'new_flatmate_references' => $faker->optional()->numberBetween(1, 2),
        'new_flatmate_couples' => $faker->optional()->boolean,
        'new_flatmate_gender' => $faker->numberBetween(1, 3),
        'new_flatmate_occupation' => $faker->numberBetween(1, 3),
        'available_from' => $faker->dateTimeBetween('tomorrow', '+1 year')->format('Y-m-d'),
        'minimum_stay' => $faker->numberBetween(1, 6),
        'maximum_stay' => $faker->numberBetween(7, 16),
        'days_available' => $faker->numberBetween(1, 3),
        'short_term' => $faker->optional()->boolean,
    ];
    
    $newData = [
        'title' => 'Updated title', 
        'description' => 'Updated DescriptionQuia sit eius impedit impedit. Nostrum perspiciatis voluptatem illum ipsa nisi omnis quia qui. Corporis ad est maxime numquam nostrum dignissimos.', 
        'cost' => 1000, 
        'deposit' => 500, 
        'size' => 1, 
        'type' =>  2, 
        'what_i_am' => 1, 
        'furnished' => 2, 
        'images' => ['imageUPD1.jpg', 'imageUPD2.jpg'],
    ];

    $images = $flat->images;
    foreach ($newData['images'] as $temporaryImage) {
        $image_path = 'images/' . $temporaryImage;
        TemporaryImage::factory()->create([
            'file' => $temporaryImage,
            'folder' => 'png' 
        ]);
       array_push($images, $image_path);
    }

    $mergedData = array_merge($relationData, $newData);
    
    $response = actingAs($user)
        ->put('/api/flats/'. $flat->id, $mergedData);
    
    // Assert that the flat is stored in the database
    $this->assertDatabaseHas('flats', [
        'title' => 'Updated title', 
        'description' => 'Updated DescriptionQuia sit eius impedit impedit. Nostrum perspiciatis voluptatem illum ipsa nisi omnis quia qui. Corporis ad est maxime numquam nostrum dignissimos.', // Generate a description with 200 characters
        'cost' => 1000, 
        'deposit' => 500, 
        'size' => 1, 
        'type' =>  2, 
        'what_i_am' => 1, 
        'furnished' => 2, 
    ]);

    // Assert that the temporary image is deleted
    foreach ($newData['images'] as $temporaryImage) {
        $this->assertDatabaseMissing('temporary_images', ['file' => $temporaryImage]);
        $this->assertFileDoesNotExist(public_path('image/' . $temporaryImage));
    }

    $response->assertStatus(201);
});
