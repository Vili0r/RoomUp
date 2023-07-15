<?php

namespace Database\Seeders;

use App\Models\Hobby;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HobbySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Hobby::create(['name' => 'Reading']);
        Hobby::create(['name' => 'Writing']);
        Hobby::create(['name' => 'Painting']);
        Hobby::create(['name' => 'Drawing']);
        Hobby::create(['name' => 'Photography']);
        Hobby::create(['name' => 'Gardening']);
        Hobby::create(['name' => 'Cooking/Baking']);
        Hobby::create(['name' => 'Playing a musical instrument']);
        Hobby::create(['name' => 'Singing']);
        Hobby::create(['name' => 'Dancing']);
        Hobby::create(['name' => 'Knitting/Crocheting']);
        Hobby::create(['name' => 'Sewing']);
        Hobby::create(['name' => 'Woodworking']);
        Hobby::create(['name' => 'Sculpting']);
        Hobby::create(['name' => 'Pottery/Ceramics']);
        Hobby::create(['name' => 'Hiking/Outdoor activities']);
        Hobby::create(['name' => 'Cycling']);
        Hobby::create(['name' => 'Running/Jogging']);
        Hobby::create(['name' => 'Swimming']);
        Hobby::create(['name' => 'Yoga']);
        Hobby::create(['name' => 'Meditation']);
        Hobby::create(['name' => 'Gaming']);
        Hobby::create(['name' => 'Collecting']);
        Hobby::create(['name' => 'Model building']);
        Hobby::create(['name' => 'Sports']);
        Hobby::create(['name' => 'Football']);
        Hobby::create(['name' => 'Fishing']);
        Hobby::create(['name' => 'Camping']);
        Hobby::create(['name' => 'Traveling']);
        Hobby::create(['name' => 'Volunteering']);
        Hobby::create(['name' => 'Learning a new language']);
        Hobby::create(['name' => 'Film/TV series watching']);
        Hobby::create(['name' => 'Playing chess']);
        Hobby::create(['name' => 'DIY projects']);
        Hobby::create(['name' => 'Wine tasting']);
        Hobby::create(['name' => 'Home brewing']);
        Hobby::create(['name' => 'Theatre']);
        Hobby::create(['name' => 'Calligraphy']);
        Hobby::create(['name' => 'Astronomy/Stargazing']);
        Hobby::create(['name' => 'Chess']);
        Hobby::create(['name' => 'Martial arts']);
        Hobby::create(['name' => 'Cars']);
    }
}
