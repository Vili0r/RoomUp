<?php

namespace Database\Seeders;

use App\Models\Amenity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AmenitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Amenity::create(['name' => 'Parking']);
        Amenity::create(['name' => 'Garden']);
        Amenity::create(['name' => 'Garage']);
        Amenity::create(['name' => 'Balcony']);
        Amenity::create(['name' => 'Disable access']);
        Amenity::create(['name' => 'Living room']);
        Amenity::create(['name' => 'Broadband']);
        Amenity::create(['name' => 'Air conditioning']);
        Amenity::create(['name' => 'Heating system']);
        Amenity::create(['name' => 'Dishwasher']);
        Amenity::create(['name' => 'Microwave']);
        Amenity::create(['name' => 'Oven']);
        Amenity::create(['name' => 'Washer']);
        Amenity::create(['name' => 'Refrigirator']);
        Amenity::create(['name' => 'Storage']);
    }
}
