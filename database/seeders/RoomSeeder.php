<?php

namespace Database\Seeders;

use App\Models\Room;
use App\Models\Shared;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(int $count = 100): void
    {
        $availableFrom = fake()->dateTimeBetween('now', '+3 month');
        $datetime = fake()->dateTimeBetween('-1 month', 'now');

        $rooms = [];
        for ($i = 1; $i <= $count; $i++) {
            $rooms[] = [
                'room_size' => rand(1, 2),
                'room_cost' => rand(100, 1000),
                'room_deposit' => rand(100, 1000),
                'room_furnished' => rand(1, 2),
                'room_references' => rand(0, 1),
                'available_from' => $availableFrom,
                'minimum_stay' => rand(1, 2),
                'maximum_stay' => rand(0, 16),
                'days_available' => rand(1, 3),
                'short_term' => rand(0, 1),
                'created_at' => $datetime,
                'updated_at' => $datetime,
                'owner_id' => rand(1, 100000),
                'owner_type' => "APP\Models\Shared",
            ];
 
            if ($i % 500 == 0 || $i == $count) {
                Room::insert($rooms);
                $rooms = [];
            }
        }
    }
}