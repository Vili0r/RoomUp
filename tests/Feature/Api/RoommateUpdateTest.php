<?php

use App\Models\Amenity;
use App\Models\Hobby;
use App\Models\User;
use Faker\Factory as Faker;
use App\Models\TemporaryImage;
 
it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/api/roommates/1', 'put');

it('fails if the roommate listing does not exist', function () {
    $user = User::factory()->create();
    actingAs($user)
        ->put('/api/roommates/1')
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

it('validates the request details', function (){
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

    actingAs($user)
        ->put('/api/roommates/'. $roommate->id)
        ->assertSessionHasErrors([
            'title',
            'description',
            'budget',
            'searching_for',
            'room_size',
            'age',
            'smoker',
            'pets',
            'occupation',
            'gender',
            'hobbies',
            'amenities',
            'area',
            'city',
            'available_from',
            'minimum_stay',
            'maximum_stay',
            'days_available', 
            'first_name',
            'last_name',
            'telephone',
            'new_flatmate_min_age',
            'new_flatmate_max_age',
            'new_flatmate_smoker',
            'new_flatmate_gender',
            'new_flatmate_occupation',
        ]);
});

it('updates the roommate listing', function () {
    Amenity::factory(10)->create();
    Hobby::factory(10)->create();
    $user = User::factory()->create();
    actingAs($user);
    $faker = Faker::create();

    $roommate = $user->roommates()->create([
        'title' => $faker->sentence(2),
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

    $relationData = [
        'amenities' => [1],
        'hobbies' => [2],
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'display_last_name' => $faker->optional()->boolean,
        'telephone' => $faker->phoneNumber,
        'display_telephone' => $faker->optional()->boolean,
        'new_flatmate_min_age' => $faker->numberBetween(18, 25),
        'new_flatmate_max_age' => $faker->numberBetween(26, 30),
        'new_flatmate_smoker' => $faker->numberBetween(1, 2),
        'new_flatmate_pets' => $faker->numberBetween(1, 2),
        'new_flatmate_references' => $faker->numberBetween(1, 2),
        'new_flatmate_couples' => $faker->optional()->boolean,
        'new_flatmate_gender' => $faker->numberBetween(1, 3),
        'new_flatmate_occupation' => $faker->numberBetween(1, 3),
        'available_from' => $faker->dateTimeBetween('tomorrow', '+1 year')->format('Y-m-d'),
        'minimum_stay' => $faker->numberBetween(1, 7),
        'maximum_stay' => $faker->numberBetween(8, 16),
        'days_available' => $faker->numberBetween(1, 3),
        'short_term' => $faker->optional()->boolean,
    ];

    $newData = [
        'title' => 'I dont know',
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
        'images' => ['imageUPD1.jpg', 'imageUPD2.jpg'],
    ];

    $images = $roommate->images;
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
        ->put('/api/roommates/'. $roommate->id, $mergedData);
    
    // Assert that the flat is stored in the database
    $this->assertDatabaseHas('roommates', [
        'title' => $newData['title'],
        'description' => $newData['description'],
        'budget' => $newData['budget'],
        'searching_for' => $newData['searching_for'],
        'room_size' => $newData['room_size'],
        'age' => $newData['age'],
        'smoker' => $newData['smoker'],
        'area' => $newData['area'],
        'city' => $newData['city'],
        'pets' => $newData['pets'],
        'occupation' => $newData['occupation'],
        'gender' => $newData['gender'],
    ]);

    // Assert that the temporary image is deleted
    foreach ($newData['images'] as $temporaryImage) {
        $this->assertDatabaseMissing('temporary_images', ['file' => $temporaryImage]);
        $this->assertFileDoesNotExist(public_path('image/' . $temporaryImage));
    }

    $response->assertStatus(201);
});