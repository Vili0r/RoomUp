<?php

namespace Database\Seeders;

use App\Models\Flat;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FlatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(int $count = 100): void
    {
        $users = User::pluck('id');
        $datetime = fake()->dateTimeBetween('-1 month', 'now');
        $liveDateTime = fake()->dateTimeBetween('now', '+2 months');

        $flats = [];
        for ($i = 1; $i <= $count; $i++) {
            $flats[] = [
                'title' => 'Flat' . $i,
                'description' => 'Flat Description' . $i,
                'cost' => rand(100, 1000),
                'deposit' => rand(100, 1000),
                'size' => rand(1, 6),
                'type' => rand(1, 3),
                'live_at' => $liveDateTime,
                'what_i_am' => rand(1, 2),
                'furnished' => rand(1, 2),
                'user_id' => $users->random(),
                'featured' => rand(0, 1),
                'available' => rand(0, 1),
                'images' => 'Flat' . $i,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ];
 
            if ($i % 500 == 0 || $i == $count) {
                Flat::insert($flats);
                $flats = [];
            }
        }
    }
}
