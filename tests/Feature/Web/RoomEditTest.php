<?php

use App\Models\Room;
use App\Models\Shared;
use App\Models\User;
use Faker\Factory as Faker;
use App\Models\TemporaryImage;

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/room/1', 'put');

it('fails if the room listing does not exist', function () {
    $user = User::factory()->create();
    actingAs($user)
        ->put('/room/1')
        ->assertStatus(404);
});

it('fails if the user does not own the room listing', function () {
    $user = User::factory()->create();
    $anotherUser = User::factory()->create();
    actingAs($anotherUser);
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

    actingAs($user)
        ->get('/room/'. $room->id .'/edit')
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
        'short_term' => $faker->boolean,
        'owner_type' => Shared::class,
        'owner_id' => $shared->id,
    ]);

    actingAs($user)
        ->put('/room/'. $room->id)
        ->assertSessionHasErrors([
            'sub_title',
            'sub_description',
            'room_size',
            'room_cost',
            'room_deposit',
            'room_furnished',
            'available_from',
            'minimum_stay',
            'maximum_stay',
            'days_available',
        ]);
});

it('updates the room listing', function () {
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

    $newData = [
        'sub_title' => 'Updated SubTitle', 
        'sub_description' => 'Updated SubDescriptionQuia sit eius impedit impedit. Nostrum perspiciatis voluptatem illum ipsa nisi omnis quia qui. Corporis ad est maxime numquam nostrum dignissimos.', 
        'room_cost' => 1000, 
        'room_deposit' => 500, 
        'room_size' => 1, 
        'room_furnished' => 2,
        'available_from' => $faker->dateTimeBetween('tomorrow', '+1 year')->format('Y-m-d'),
        'minimum_stay' => 7,
        'maximum_stay' => 16,
        'days_available' => $faker->numberBetween(1, 3), 
        'short_term' => true,
        'images' => ['imageUPD1.jpg', 'imageUPD2.jpg'],
    ];

    $images = [];
    foreach ($newData['images'] as $temporaryImage) {
        $image_path = 'images/' . $temporaryImage;
        TemporaryImage::factory()->create([
            'file' => $temporaryImage,
            'folder' => 'png' 
        ]);
       array_push($images, $image_path);
    }
    
    $response = actingAs($user)
        ->put('/room/'. $room->id, $newData);
    
    // Assert that the flat is stored in the database
    $this->assertDatabaseHas('rooms', [
        'sub_title' => 'Updated SubTitle', 
        'sub_description' => 'Updated SubDescriptionQuia sit eius impedit impedit. Nostrum perspiciatis voluptatem illum ipsa nisi omnis quia qui. Corporis ad est maxime numquam nostrum dignissimos.', 
        'room_cost' => 1000, 
        'room_deposit' => 500, 
        'room_size' => 1, 
        'room_furnished' => 2,
        'available_from' => $newData['available_from'],
        'short_term' => 1,
        'minimum_stay' => 7,
        'maximum_stay' => 16,
        'days_available' => $newData['days_available'],  
    ]);

    // Assert that the temporary image is deleted
    foreach ($newData['images'] as $temporaryImage) {
        $this->assertDatabaseMissing('temporary_images', ['file' => $temporaryImage]);
        $this->assertFileDoesNotExist(public_path('image/' . $temporaryImage));
    }

    $response->assertRedirect('/shared/'. $shared->id);
});