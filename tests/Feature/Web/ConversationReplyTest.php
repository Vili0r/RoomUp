<?php

use App\Events\ConversationReplyCreated;
use Illuminate\Support\Facades\Event;
use App\Models\User;
use App\Models\Flat;
use Faker\Factory as Faker;


it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/conversation/1', 'get');

it('fails if the conversation does not exist', function () {
    $user = User::factory()->create();
    actingAs($user)
        ->get('/conversation/1')
        ->assertStatus(404);
});

it('does not allow unauthenticated user to get the conversation', function() {
    $response = $this->post('/conversation/1/reply');

    $response->assertStatus(302);
});

it('it saves a reply to a conversation', function () {
    // Create a user and authenticate them
    $owner = User::factory()->create();
    $user1 = User::factory()->create();
    $faker = Faker::create();
    Event::fake();
    
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

    $bodyReply = [
        'body' => $faker->sentence(5)
    ];

    $response = $this->post(route('conversation.reply', $conversation), $bodyReply);

    // Assert a conversation was created
    $this->assertDatabaseHas('conversations', [
        'body' => $bodyReply['body'],
        'message_id' => $message->id,
        'parent_id' => $conversation->id,
    ]);

    Event::assertDispatched(ConversationReplyCreated::class);
    broadcast(new ConversationReplyCreated($conversation, $user1->id))->toOthers();

    $response->assertRedirect();
});
