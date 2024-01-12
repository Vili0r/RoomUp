<?php

namespace Database\Seeders;

use App\Models\Support;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SupportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Support::create([
            'name' => 'customer support',
            'email' => 'support@roomup.gr',
            'user_id' => 6,
            'last_active_at' => now()
        ]);
    }
}
