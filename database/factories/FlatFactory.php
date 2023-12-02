<?php

namespace Database\Factories;

use App\Models\Flat;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Flat>
 */
class FlatFactory extends Factory
{
    protected $model = Flat::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(5),
            'description' => fake()->text(200),
            'cost' => fake()->numberBetween(100, 1000),
            'deposit' => fake()->numberBetween(50, 500),
            'size' => fake()->numberBetween(1, 6), // Generate a random size between 500 and 2000
            'type' => fake()->numberBetween(1, 3),
            'what_i_am' => fake()->numberBetween(1, 2), // Generate a what_i_am with 10 words
            'furnished' => fake()->numberBetween(1, 2), 
            'images' => ['image1.jpg', 'image2.jpg'],
            'user_id' => User::factory(),
        ];
    }
}
