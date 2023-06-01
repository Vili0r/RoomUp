<?php

namespace Database\Seeders;

use App\Models\Flatmate;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FlatmateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(int $count = 100): void
    {
        Flatmate::factory($count)->create([
            'owner_type' => "APP\Models\Shared",
        ]);

        Flatmate::factory($count)->create([
            'owner_type' => "APP\Models\Flat",
        ]);
    }
}
