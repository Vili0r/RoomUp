<?php

namespace Database\Factories;

use App\Models\Shared;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Advertiser>
 */
class AdvertiserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'display_last_name' => rand(0, 1),
            'telephone' => fake()->phoneNumber(),
            'display_telephone' => rand(0, 1),
            'owner_id' => rand(1, 100000),
            //'owner_type' => "APP\Models\Shared",
        ];
    }
}
