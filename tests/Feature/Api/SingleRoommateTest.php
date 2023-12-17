<?php

use App\Models\User;
use Faker\Factory as Faker;
use App\Jobs\UserViewedRoommate;

it('handles authenticated or guest user to view the roommate listing', function () {
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

    // Dispatch the job with a user and a room
    $job = new UserViewedRoommate($user, $roommate);
    $job->handle();

    // Refresh the user instance to get the updated state
    $user->refresh();

    // Assert that the user's viewedRoommates relationship is updated
    $this->assertTrue($user->viewedRoommates()->where('viewable_id', $roommate->id)->exists());
    $this->assertEquals(1, $user->viewedRoommates()->where('viewable_id', $roommate->id)->first()->pivot->count);

    // Test the case when a user is not provided
    $job = new UserViewedRoommate(null, $roommate);
    $job->handle();

    // Refresh the roommate instance to get the updated state
    $roommate->refresh();

    // Assert that the roommate's viewedUsers relationship is updated
    $this->assertTrue($roommate->viewedUsers()->where('viewable_id', $roommate->id)->exists());
    $this->assertEquals(2, $roommate->viewedUsers()->where('viewable_id', $roommate->id)->first()->pivot->count);
});

it('renders single roommate listing correctly', function () {
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

    $response = actingAs($user)->get('/api/roommates/' . $roommate->id . '/quest/');

    $response->assertStatus(200);
});
