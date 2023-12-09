<?php

use App\Models\Flat;
use Inertia\Testing\AssertableInertia as Assert;
use App\Models\User;
use Faker\Factory as Faker;

it('does not allow unauthenticated user to get the conversation', function() {
    $response = $this->get('/conversation');

    $response->assertStatus(302);
});

it('returns the conversations of the authenticated user', function () {
     // Create a user and authenticate them
    $owner = User::factory()->create();
    $user1 = User::factory()->create();
    $faker = Faker::create();
    
    actingAs($owner);
    $flat = Flat::factory()->create([
        'user_id' => $owner->id
    ]);

    $message = $flat->messages()->create([
        'user_id' => $user1->id,
        'full_name' => $faker->firstName,
        'email' => $faker->email,
        'message_text' => $faker->sentence(5),
        'phone_number' => 3465732947,
        'owner_type' => 'flat',
        'owner_id' => $flat->id,
        'receiver_id' => $owner->id
    ]);

    $conversation = $message->conversation()->create([
        'body' => $message->message_text,
        'message_id' => $message->id,
        'user_id' => $user1->id,
    ]);

    $conversation->user()->associate($user1->id);
    $conversation->touchLastReply();

    $conversation->users()->sync(array_unique(
        array_merge([$owner->id], [$user1->id])
    ));

    $response = $this->get(route('conversation.index'));

    $this->assertDatabaseHas('conversations', [
        'id' => $conversation->id,
        'body' => $conversation->body,
        'message_id' => $message->id,
        'user_id' => $user1->id,
    ]);
    
    $this->assertDatabaseHas('conversation_user', [
        'conversation_id' => $conversation->id,
        'user_id' => $user1->id,
    ]);
    $this->assertDatabaseHas('conversation_user', [
        'conversation_id' => $conversation->id,
        'user_id' => $owner->id,
    ]);

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Conversation/Index')
        ->has('conversations', 1)
        ->has('conversations.0', fn (Assert $page) => $page
            ->where('id', $conversation->id)
            ->where('user_id', $user1->id)
            ->etc()
        )
    );
});
