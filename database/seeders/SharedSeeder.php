<?php

namespace Database\Seeders;

use App\Models\Shared;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SharedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(int $count = 100): void
    {
        $users = User::pluck('id');
        $datetime = fake()->dateTimeBetween('-1 month', 'now');
        $liveDateTime = fake()->dateTimeBetween('now', '+2 months');

        $shareds = [];
        for ($i = 1; $i <= $count; $i++) {
            $shareds[] = [
                'title' => 'Shared' . $i,
                'description' => 'Shared Description' . $i,
                'available_rooms' => rand(1, 10),
                'size' => rand(1, 10),
                'type' => rand(1, 3),
                'current_occupants' => rand(0, 10),
                'what_i_am' => rand(1, 5),
                'user_id' => $users->random(),
                'live_at' => $liveDateTime,
                'featured' => rand(0, 1),
                'available' => rand(0, 1),
                'current_flatmate_age' => rand(18, 35),
                'current_flatmate_smoker' => rand(1, 2),
                'current_flatmate_pets' => rand(1, 2),
                'current_flatmate_occupation' => rand(1, 2),
                'current_flatmate_gender' => rand(1, 2),
                'images' => 'Shared' . $i,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ];
 
            if ($i % 500 == 0 || $i == $count) {
                Shared::insert($shareds);
                $shareds = [];
            }
        }
    }
}
