<?php

namespace Database\Seeders;

use App\Models\Transport;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(int $count = 100): void
    {
        Transport::factory($count)->create([
            'owner_type' => "APP\Models\Shared",
        ]);

        Transport::factory($count)->create([
            'owner_type' => "APP\Models\Flat",
        ]);
    }
}
