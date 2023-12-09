<?php

use App\Models\Flat;
use Inertia\Testing\AssertableInertia as Assert;
use App\Models\User;
use Faker\Factory as Faker;

it('does not allow unauthenticated user to view messages', function() {
    $response = $this->get('/message');

    $response->assertStatus(302);
});

it('returns the messages of the authenticated user', function () {
    // Create a user and authenticate them
    $owner = User::factory()->create();
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();
    $faker = Faker::create();

    $data = [
        'full_name' => $faker->firstName,
        'email' => $faker->email,
        'message_text' => $faker->sentence(5),
        'phone_number' => $faker->phoneNumber,
    ];
 
    actingAs($owner);
    $flat = Flat::factory()->create([
        'user_id' => $owner->id
    ]);

    $flat->messages()->create([
        'user_id' => $user1->id,
        'full_name' => $data['full_name'],
        'email' => $data['email'],
        'message_text' => $data['message_text'],
        'phone_number' => $data['phone_number'],
        'receiver_id' => $owner->id,
    ]);
    $flat->messages()->create([
        'user_id' => $user2->id,
        'full_name' => $data['full_name'],
        'email' => $data['email'],
        'message_text' => $data['message_text'],
        'phone_number' => $data['phone_number'],
        'receiver_id' => $owner->id,
    ]);
    
    // Make a request to the index method
    $response = $this->get(route('message.index'));

    // Assert the response status is 200 OK
    $response->assertStatus(200);
    // Assert the response has the correct Inertia view with the paginated messages
    $response->assertInertia(fn (Assert $page)  => $page
            ->component('Message/Index')
            ->has('messages.data', 2)
    );
});
