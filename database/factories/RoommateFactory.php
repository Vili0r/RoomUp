<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Roommate>
 */
class RoommateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->text(5),
            'description' => fake()->text(200),
            'budget' => fake()->numberBetween(100, 1000),
            'searching_for' => fake()->numberBetween(1, 3),
            'room_size' => fake()->numberBetween(1, 2),
            'age' => fake()->numberBetween(18, 30),
            'smoker' => fake()->numberBetween(1, 2),
            'pets' => fake()->numberBetween(1, 2),
            'occupation' => fake()->numberBetween(1, 2),
            'gender' => fake()->numberBetween(1, 2),
            'area' => fake()->city,
            'city' => fake()->city,
            'images' => ['image1.jpg', 'image2.jpg'],
        ];
    }
}
