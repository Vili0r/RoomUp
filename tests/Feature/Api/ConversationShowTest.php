<?php

use Illuminate\Support\Facades\Gate;
use App\Models\User;
use App\Models\Flat;
use Illuminate\Testing\Fluent\AssertableJson;
use Faker\Factory as Faker;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/api/conversation/1', 'get');

it('fails if the conversation does not exist', function () {
    $user = User::factory()->create();
    actingAs($user)
        ->get('/api/conversation/1')
        ->assertStatus(404);
});

it('does not allow unauthenticated user to get the conversation', function() {
    $response = $this->get('/api/conversation');

    $response->assertStatus(302);
});

it('aborts the shows conversation reply', function () {
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
    $replyConversation = $message->conversation()->create([
        'body' => 'I dont know',
        'parent_id' => $conversation->id,
        'user_id' => $user1->id,
    ]);

    $conversation->user()->associate($user1->id);
    $conversation->touchLastReply();

    $conversation->users()->sync(array_unique(
        array_merge([$owner->id], [$user1->id])
    ));
    $conversation->replies()->save($replyConversation);

    Gate::before(function ($user, $ability) {
        return true;
    });
    $response = $this->get(route('api.conversation.show', $replyConversation));

    $response->assertStatus(404);
});

it('shows the conversation of a listing', function () {
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

    $response = $this->get(route('api.conversation.show', $conversation));

    $this->assertAuthenticatedAs($owner);
    $this->assertTrue($owner->can('show', $conversation));

    $response->assertStatus(200);
    $response->assertJsonStructure([
        'singleConversation' => [
            'id', 'user_id', 'message', 'replies', // etc.
        ],
        'conversations' => [
            '*' => [
                'id', 'user_id', 'message', 'sender', // etc.
            ]
        ]
    ]);
});