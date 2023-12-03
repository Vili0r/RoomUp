<?php

use App\Models\User;
use Faker\Factory as Faker;
use Inertia\Testing\AssertableInertia as Assert;

it('renders the properties index page without search request', function () {
    $user = User::factory()->create();
    actingAs($user);
    $faker = Faker::create();

    for($i = 0; $i < 5; $i++) {
        $user->flats()->create([
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
    }

    for($i = 0; $i < 5; $i++) {
        $user->shareds()->create([
            'title' => 'Two bedroom'. $i,
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
    }

    // Act
    $response = $this->get(route('my-properties'));

    // Assert
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Properties/Index')
        ->has('properties.data', 10) 
    );
});

it('renders the properties index page with search request', function () {
    $user = User::factory()->create();
    actingAs($user);
    $faker = Faker::create();

    for($i = 0; $i <= 5; $i++) {
        $user->flats()->create([
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
    }

    for($i = 0; $i <= 5; $i++) {
        $user->shareds()->create([
            'title' => 'Two bedroom'. $i,
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
    }

    // Act
    $response = $this->get(route('my-properties', ['search' => 'Two bedroom']));

    // Assert
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Properties/Index')
        ->has('properties.data', 6) // Assuming there are 6 items in total
        ->has('filters', fn (Assert $page) => $page
            ->where('search', 'Two bedroom') // Assert that the search term is present in the filters
            ->etc()
        )
    );
});
