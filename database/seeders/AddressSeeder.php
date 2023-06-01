<?php

namespace Database\Seeders;

use App\Models\Address;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(int $count = 100): void
    {
        Address::factory($count)->create([
            'owner_type' => "APP\Models\Shared",
        ]);

        Address::factory($count)->create([
            'owner_type' => "APP\Models\Flat",
        ]);
    }
}
