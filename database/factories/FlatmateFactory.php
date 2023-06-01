<?php

namespace Database\Factories;

use App\Models\Shared;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Flatmate>
 */
class FlatmateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'new_flatmate_min_age' => rand(18, 25),
            'new_flatmate_max_age' => rand(26, 30),
            'new_flatmate_smoker' => rand(1, 2),
            'new_flatmate_pets' => rand(1, 2),
            'new_flatmate_references' => rand(0, 1),
            'new_flatmate_couples' => rand(0, 1),
            'new_flatmate_gender' => rand(1, 3),
            'new_flatmate_occupation' => rand(1, 3),
            'owner_id' => rand(1, 100000),
            //'owner_type' => "APP\Models\Shared",
        ];
    }
}
