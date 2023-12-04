<?php

use Inertia\Testing\AssertableInertia as Assert;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

it('returns the viewed listings of the authenticated user', function () {
    $user = User::factory()->create();
    $faker = Faker::create();
    actingAs($user);
    $addressData = [
        'address_1' => $faker->streetAddress,
        'address_2' => $faker->optional()->secondaryAddress,
        'area' => $faker->city,
        'city' => $faker->city,
        'post_code' => $faker->postcode,
        'long' => $faker->randomFloat(7, -180, 180),
        'lat' => $faker->randomFloat(7, -180, 180),
    ];
    $advertiserData = [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'display_last_name' => $faker->boolean,
        'telephone' => $faker->phoneNumber,
        'display_telephone' => $faker->boolean,
    ];
    $flat = $user->flats()->create([
        'title' => $faker->sentence(3),
        'description' => $faker->text(55), 
        'cost' => $faker->numberBetween(100, 1000), 
        'deposit' => $faker->numberBetween(50, 500), 
        'size' => 1, 
        'type' => $faker->numberBetween(1, 3), 
        'what_i_am' => $faker->numberBetween(1, 2), 
        'furnished' => $faker->numberBetween(1, 2), 
        'user_id' => $user->id, 
        'images' => ['image1.jpg', 'image2.jpg'],
    ]);
    
    $shared = $user->shareds()->create([
        'title' => "I don't know",
        'description' => $faker->text(55),
        'available_rooms' => $faker->numberBetween(1, 10),
        'size' => 1, 
        'type' => $faker->numberBetween(1, 3), 
        'current_occupants' => $faker->numberBetween(0, 10),
        'what_i_am' => $faker->numberBetween(1, 2),
        'current_flatmate_age' => $faker->numberBetween(18, 60),
        'current_flatmate_smoker' => $faker->numberBetween(1, 2),
        'current_flatmate_pets' => $faker->numberBetween(1, 2),
        'current_flatmate_occupation' => $faker->numberBetween(1, 2),
        'current_flatmate_gender' => $faker->numberBetween(1, 2),
        'user_id' => $user->id, 
        'images' => ['image1.jpg', 'image2.jpg'],
    ]);

    $room = $shared->rooms()->create([
        'sub_title' => $faker->text(5),
        'sub_description' => $faker->text(20),
        'room_size' => $faker->numberBetween(1, 2),
        'room_cost' => $faker->numberBetween(100, 1000),
        'room_deposit' => $faker->numberBetween(50, 500),
        'room_furnished' => $faker->numberBetween(1, 2),
        'available_from' => $faker->dateTimeBetween('tomorrow', '+1 year')->format('Y-m-d'),
        'minimum_stay' => $faker->numberBetween(1, 7),
        'maximum_stay' => $faker->numberBetween(8, 16),
        'days_available' => $faker->numberBetween(1, 3),
        'short_term' => false,
        'owner_type' => Shared::class,
        'owner_id' => $shared->id,
    ]);
    
    $flat->address()->create($addressData);
    $flat->advertiser()->create($advertiserData);
    $shared->address()->create($addressData);
    $shared->advertiser()->create($advertiserData);

    // Simulate the user favoriting a flat and a room.
    $user->viewedFlats()->attach($flat, [
        'count' => 1,
        'updated_at' => now()
    ]);
    $user->viewedRooms()->attach($room, [
        'count' => 1,
        'updated_at' => now()
    ]);

    $response = $this->get(route('property.viewed'));

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Viewed/RecentlyViewed')
        ->has('properties', 2) 
        ->has('properties.0', fn (Assert $page) => $page
            ->where('id', $flat->id)
            ->where('model', 'flat')
            ->where('title', $flat->title)
            ->where('size', 'One Bed')
            ->where('type', Str::replace('_', ' ', $flat->type->name))
            ->where('images', $flat->images)
            ->where('description', $flat->description.'...')
            ->where('favouritedBy', $flat->favouritedBy($user))
            ->where('created_at', $flat->created_at->toDateTimeString())
            ->where('updated_at', $flat->pivot ? $flat->pivot->updated_at->toDateTimeString() : now()->toDateTimeString())
            ->where('address_1', $flat->address->address_1)
            ->where('area', $flat->address->area)
            ->where('first_name', $flat->advertiser->first_name)
            ->where('views', $flat->views())
        )
        ->has('properties.1', fn (Assert $page) => $page
            ->where('id', $room->id)
            ->where('model', 'room')
            ->where('title', $room->sub_title ? $room->sub_title : $room->owner->title)
            ->where('size', 'One Bed')
            ->where('type', Str::replace('_', ' ', $room->owner->type->name))
            ->where('images', $room->owner->images)
            ->where('description', $room->sub_description ? substr($room->sub_description, 0, 250) . '...' : substr($room->owner->description, 0, 250) . '...')
            ->where('favouritedBy', $room->favouritedBy($user))
            ->where('created_at', $room->created_at->toDateTimeString())
            ->where('updated_at', $room->pivot ? $room->pivot->updated_at->toDateTimeString() : now()->toDateTimeString())
            ->where('address_1', $room->owner->address->address_1)
            ->where('area', $room->owner->address->area)
            ->where('first_name', $room->owner->advertiser->first_name)
            ->where('views', $room->views())
        )
        ->where('indexLimit', 10)
    );
});
