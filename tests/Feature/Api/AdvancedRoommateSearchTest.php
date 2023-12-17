<?php

use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;

uses(RefreshDatabase::class);

it('renders the flatmate search page with search request', function () {
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
            'age' => $faker->numberBetween(18, 28),
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

    $user->roommates()->create([
        'title' => $faker->sentence(2),
        'description' => $faker->text(200),
        'budget' => $faker->numberBetween(100, 1000),
        'searching_for' => $faker->numberBetween(1, 3),
        'room_size' => $faker->numberBetween(1, 2),
        'age' => 29,
        'smoker' => $faker->numberBetween(1, 2),
        'pets' => $faker->numberBetween(1, 2),
        'occupation' => $faker->numberBetween(1, 2),
        'gender' => $faker->numberBetween(1, 2),
        'area' => $faker->city,
        'city' => $faker->city,
        'user_id' => $user->id, 
        'images' => ['image1.jpg', 'image2.jpg'],
    ]);

   //Act
    $response = $this->get('/api/roommate-search?age=29');
    $response->assertStatus(200)
        ->assertJson(function (AssertableJson $json) {
            $json->has('data', 6)
                ->has('pagination') 
                ->has('selectedRoommateQueries', function ($json) {
                    $json->where('age', '29');
                })
                ->etc();
        });
});