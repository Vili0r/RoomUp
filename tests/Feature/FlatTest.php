<?php

use App\Models\Flat;
use Illuminate\Foundation\Testing\WithFaker;

uses(WithFaker::class);

it('can store a flat', function () {
    $startDate = new DateTime(); // Current date and time
    $endDate = new DateTime('+1 year'); // One year from now

    $randomDate = mt_rand($startDate->getTimestamp(), $endDate->getTimestamp());
    $randomDate = date('Y-m-d H:i:s', $randomDate);

    // $addressData = [
    //     'address_1' => $this->faker->streetAddress,
    //     'area' => 'Cholargos',
    //     'city' => $this->faker->randomElement(['athens', 'london']),
    //     'post_code' => $this->faker->postcode,
    // ];

    // $transportData = [
    //     'minutes' => $this->faker->numberBetween(1, 5),
    //     'mode' => $this->faker->numberBetween(1, 4),
    //     'station' => $this->faker->numberBetween(1, 10),
    // ];

    // $advertiserData = [
    //     'first_name' => $this->faker->firstName,
    //     'last_name' => $this->faker->lastName,
    //     'display_last_name' => $this->faker->numberBetween(0, 1),
    //     'telephone' => $this->faker->phoneNumber,
    //     'display_telephone' => $this->faker->numberBetween(0, 1),
    // ];

    // $flatmateData = [
    //     'new_flatmate_min_age' => $this->faker->numberBetween(18, 30),
    //     'new_flatmate_max_age' => $this->faker->numberBetween(31, 35),
    //     'new_flatmate_smoker' => $this->faker->numberBetween(1, 2),
    //     'new_flatmate_pets' => $this->faker->numberBetween(1, 2),
    //     'new_flatmate_references' => $this->faker->numberBetween(0, 1),
    //     'new_flatmate_couples' => $this->faker->numberBetween(0, 1),
    //     'new_flatmate_gender' => $this->faker->numberBetween(1, 3),
    //     'new_flatmate_occupation' => $this->faker->numberBetween(1, 3),
    // ];

    // $availabilityData = [ 
    //     'available_from' => $randomDate,
    //     'minimum_stay' => $this->faker->numberBetween(1, 7),
    //     'maximum_stay' => $this->faker->numberBetween(8, 16),
    //     'days_available' => $this->faker->numberBetween(1, 3),
    //     'short_term' => $this->faker->numberBetween(0, 1),
    // ];


    // login()->post('/flat', [
    //     'title' => 'Two bedroom flat',
    //     'description' => $this->faker->sentence(50),
    //     'cost' => $this->faker->numberBetween(100, 1000),
    //     'deposit' => $this->faker->numberBetween(100, 1000),
    //     'size' => $this->faker->numberBetween(1, 10),
    //     'type' => $this->faker->numberBetween(1, 3),
    //     'live_at' => now(),
    //     'what_i_am' => $this->faker->numberBetween(1, 2),
    //     'furnished' => $this->faker->numberBetween(1, 2),
    //     'featured' => $this->faker->numberBetween(0, 1),
    //     'available' => $this->faker->numberBetween(0, 1),
    //     'images' => ['images/fvkjsdfdsf', 'images/fvkjsdfddmjdmd'],
    // ]);


    login()->post('/admin/categories', [
        'name' => $this->faker->text(20),
        'slug' => 'Vilior',
    ]);
    
    $this->assertDatabaseHas('categories', [
        'slug' => 'Vilior',
    ]);

    // $response->address()->create($addressData);
    // $response->advertiser()->create($advertiserData);
    // $response->transport()->create($transportData);
    // $response->flatmate()->create($flatmateData);
    // $response->availability()->create($availabilityData);

    $flat = Flat::latest()->first();

    expect($flat->title)->toBe('Two bedroom flat');
    expect($flat->description)->toBeString();
    expect($flat->deposit)->toBeInt();
});
