<?php

use App\Models\User;
use Faker\Factory as Faker;
use Inertia\Testing\AssertableInertia as Assert;

it('renders the roommate index listing page', function () {
    $user = User::factory()->create();
    actingAs($user);
    $faker = Faker::create();

    for($i = 0; $i < 5; $i++) {
        $user->roommates()->create([
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
    }

    // Act
    $response = $this->get(route('roommate.index'));

    // Assert
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Roommate/Index')
        ->has('roommates.data', 5) 
    );
});
