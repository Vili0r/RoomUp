<?php

namespace Database\Seeders;

use App\Models\Advertiser;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdvertiserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(int $count = 100): void
    {
        Advertiser::factory($count)->create([
            'owner_type' => "APP\Models\Shared",
        ]);

        Advertiser::factory($count)->create([
            'owner_type' => "APP\Models\Flat",
        ]);
    }
}
