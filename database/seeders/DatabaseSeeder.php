<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            AdminSeeder::class,
            AmenitySeeder::class,
            HobbySeeder::class,
            CategorySeeder::class,
        ]);
 
        $this->callWith(UserSeeder::class, [
            'users' => 100
        ]);
        // $this->callWith(SharedSeeder::class, [
        //     'count' => 10000
        // ]);
        // $this->callWith(FlatSeeder::class, [
        //     'count' => 10000
        // ]);
        // $this->callWith(AddressSeeder::class, [
        //     'count' => 100
        // ]);
        // $this->callWith(AdvertiserSeeder::class, [
        //     'count' => 100
        // ]);
        // $this->callWith(FlatmateSeeder::class, [
        //     'count' => 100
        // ]);
        // $this->callWith(TransportSeeder::class, [
        //     'count' => 100
        // ]);
        // $this->callWith(RoomSeeder::class, [
        //     'count' => 20000
        // ]);
    }
}
