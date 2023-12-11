<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blog>
 */
class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->text(20);

        return [
            'title' => 'House'. $title,
            'body' => $this->faker->text(200),
            'published_at' => $this->faker->dateTimeBetween('now + 2 days', 'now + 1 year')->format('Y-m-d'),
            'slug' => Str::slug($title),
            'image' => $this->faker->imageUrl($width = 640, $height = 480),
        ];
    }
}
