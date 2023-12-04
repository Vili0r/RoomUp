<?php

namespace Database\Factories;

use App\Models\Shared;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'address_1' => fake()->streetAddress(),
            'address_2' => fake()->streetAddress(),
            'area' => fake()->name(),
            'city' => fake()->name(),
            'long' => fake()->longitude(),
            'lat' => fake()->latitude(),
            'post_code' => fake()->postcode(),
        ];
    }
}
