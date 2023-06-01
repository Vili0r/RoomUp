<?php

namespace Database\Factories;

use App\Models\Shared;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transport>
 */
class TransportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'minutes' => rand(1, 5),
            'mode' => rand(1, 4),
            'station' => rand(1, 10),
            'owner_id' => rand(1, 100000),
            //'owner_type' => "APP\Models\Shared",
        ];
    }
}
