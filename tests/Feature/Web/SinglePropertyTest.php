<?php

use App\Models\User;
use Faker\Factory as Faker;
use Inertia\Testing\AssertableInertia as Assert;
use App\Jobs\UserViewedFlat;
use App\Jobs\UserViewedRoom;

it('handles authenticated or guest user to view the room listing', function () {
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
        'room_cost' => 100,
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

    // Dispatch the job with a user and a room
    $job = new UserViewedRoom($user, $room);
    $job->handle();

    // Refresh the user instance to get the updated state
    $user->refresh();

    // Assert that the user's viewedRooms relationship is updated
    $this->assertTrue($user->viewedRooms()->where('viewable_id', $room->id)->exists());
    $this->assertEquals(1, $user->viewedRooms()->where('viewable_id', $room->id)->first()->pivot->count);

    // Test the case when a user is not provided
    $job = new UserViewedRoom(null, $room);
    $job->handle();

    // Refresh the room instance to get the updated state
    $room->refresh();

    // Assert that the room's viewedUsers relationship is updated
    $this->assertTrue($room->viewedUsers()->where('viewable_id', $room->id)->exists());
    $this->assertEquals(2, $room->viewedUsers()->where('viewable_id', $room->id)->first()->pivot->count);
});

it('handles authenticated or guest user to view the flat listing', function () {
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

    // Dispatch the job with a user and a room
    $job = new UserViewedFlat($user, $flat);
    $job->handle();

    // Refresh the user instance to get the updated state
    $user->refresh();

    // Assert that the user's viewedFlats relationship is updated
    $this->assertTrue($user->viewedFlats()->where('viewable_id', $flat->id)->exists());
    $this->assertEquals(1, $user->viewedFlats()->where('viewable_id', $flat->id)->first()->pivot->count);

    // Test the case when a user is not provided
    $job = new UserViewedFlat(null, $flat);
    $job->handle();

    // Refresh the flat instance to get the updated state
    $flat->refresh();

    // Assert that the flat's viewedUsers relationship is updated
    $this->assertTrue($flat->viewedUsers()->where('viewable_id', $flat->id)->exists());
    $this->assertEquals(2, $flat->viewedUsers()->where('viewable_id', $flat->id)->first()->pivot->count);
});

it('renders single room listing correctly', function () {
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
        'room_cost' => 100,
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

    $response = actingAs($user)->get('/property/room/' . $room->id);

    $response->assertInertia(fn (Assert $page) => $page
            ->component('Home/SingleProperty')
    );
});

it('renders single flat listing correctly', function () {
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

    $response = actingAs($user)->get('/property/flat/' . $flat->id);

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
            ->component('Home/SingleProperty')
    );
});
