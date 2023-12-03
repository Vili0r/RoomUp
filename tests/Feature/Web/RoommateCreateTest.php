<?php

use App\Models\Amenity;
use App\Models\Hobby;
use App\Models\TemporaryImage;
use App\Models\User;
use Faker\Factory as Faker;

beforeEach(fn () => $this->user = User::factory()->create());

it('does not allow unauthenticated user to store a roommate listing', function() {
    $response = $this->post('/roommate');

    $response->assertStatus(302);
});

it('validates the request details', function (){
    actingAs($this->user)
        ->post('/roommate')->assertSessionHasErrors([
            'title',
            'description',
            'budget',
            'searching_for',
            'room_size',
            'age',
            'smoker',
            'pets',
            'occupation',
            'gender',
            'hobbies',
            'amenities',
            'area',
            'city',
            'images',
            'available_from',
            'minimum_stay',
            'maximum_stay',
            'days_available', 
            'first_name',
            'last_name',
            'telephone',
            'new_flatmate_min_age',
            'new_flatmate_max_age',
            'new_flatmate_smoker',
            'new_flatmate_gender',
            'new_flatmate_occupation',
        ]);
});

it('creates a roommate lisitng', function () {
    $amenities = Amenity::factory(10)->create();
    $hobbies = Hobby::factory(10)->create();
    $faker = Faker::create();

    $relationData = [
        'amenities' => [
            ['id' => $amenities->random()->id],
            ['id' => $amenities->random()->id],
            ['id' => $amenities->random()->id],
        ],
        'hobbies' => [
            ['id' => $hobbies->random()->id],
            ['id' => $hobbies->random()->id],
            ['id' => $hobbies->random()->id],
        ],
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'display_last_name' => $faker->optional()->boolean,
        'telephone' => $faker->phoneNumber,
        'display_telephone' => $faker->optional()->boolean,
        'new_flatmate_min_age' => $faker->numberBetween(18, 60),
        'new_flatmate_max_age' => $faker->numberBetween(18, 60),
        'new_flatmate_smoker' => $faker->numberBetween(1, 2),
        'new_flatmate_pets' => $faker->numberBetween(1, 2),
        'new_flatmate_references' => $faker->optional()->numberBetween(1, 2),
        'new_flatmate_couples' => $faker->optional()->boolean,
        'new_flatmate_gender' => $faker->numberBetween(1, 3),
        'new_flatmate_occupation' => $faker->numberBetween(1, 3),
        'available_from' => $faker->dateTimeBetween('tomorrow', '+1 year')->format('Y-m-d'),
        'minimum_stay' => $faker->numberBetween(1, 16),
        'maximum_stay' => $faker->numberBetween(1, 16),
        'days_available' => $faker->numberBetween(1, 3),
        'short_term' => $faker->optional()->boolean,
    ];

    $data = [
        'title' => 'i dont have',
        'description' => $faker->text(200),
        'budget' => $faker->numberBetween(100, 1000),
        'searching_for' => $faker->numberBetween(1, 3),
        'room_size' => $faker->numberBetween(1, 2),
        'age' => $faker->numberBetween(18, 30),
        'smoker' => $faker->numberBetween(1, 2),
        'pets' => $faker->numberBetween(1, 2),
        'occupation' => $faker->numberBetween(1, 2),
        'gender' => $faker->numberBetween(1, 2),
        'area' => $faker->city,
        'city' => $faker->city,
        'user_id' => $this->user->id, 
    ];

    // Mock the file storage and create temporary images
    $temporaryImages = ['image1.jpg', 'image2.jpg'];
    foreach ($temporaryImages as $temporaryImage) {
        TemporaryImage::factory()->create([
            'file' => $temporaryImage,
            'folder' => 'png' 
        ]);
    }

    $data['images'] = $temporaryImages;

    $mergedData = array_merge($relationData, $data);
    $response = actingAs($this->user)
        ->post('/roommate', $mergedData);

    // Assert that the flat is stored in the database
    $this->assertDatabaseHas('roommates', [
        'title' => $data['title'],
        'description' => $data['description'],
        'budget' => $data['budget'],
        'searching_for' => $data['searching_for'],
        'room_size' => $data['room_size'],
        'age' => $data['age'],
        'smoker' => $data['smoker'],
        'area' => $data['area'],
        'city' => $data['city'],
        'pets' => $data['pets'],
        'occupation' => $data['occupation'],
        'gender' => $data['gender'],
    ]);

    // Assert that the flat's advertiser is stored in the database
     $this->assertDatabaseHas('advertisers', [
        'first_name' => $relationData['first_name'],
        'last_name' => $relationData['last_name'],
        'telephone' => $relationData['telephone'],
    ]);

    // Assert that the flat's flatmate is stored in the database
    $this->assertDatabaseHas('flatmates', [
        'new_flatmate_min_age' => intval($relationData['new_flatmate_min_age']),
        'new_flatmate_max_age' => $relationData['new_flatmate_max_age'],
        'new_flatmate_smoker' => $relationData['new_flatmate_smoker'],
        'new_flatmate_pets' => $relationData['new_flatmate_pets'],
        'new_flatmate_occupation' => $relationData['new_flatmate_occupation'],
        'new_flatmate_gender' => $relationData['new_flatmate_gender'],
    ]);

    // Assert that the flat's availability is stored in the database
    $this->assertDatabaseHas('availabilities', [
        'available_from' => $relationData['available_from'],
        'minimum_stay' => $relationData['minimum_stay'],
        'maximum_stay' => $relationData['maximum_stay'],
        'days_available' => $relationData['days_available'],
    ]);

    // Assert that the temporary images are deleted from the database
    foreach ($temporaryImages as $temporaryImage) {
        $this->assertDatabaseMissing('temporary_images', ['file' => $temporaryImage]);
    }

    $response->assertRedirect('/dashboard');
});

it('allows authenticated user to access create roommate route', function() {
    $response = actingAs($this->user)
                ->get('/roommate/create');

    $response->assertStatus(200);
});

it('deos not allow unauthenticated user to access create roommate route', function() {
    $response = $this->get('/roommate/create');

    $response->assertStatus(302);
});
