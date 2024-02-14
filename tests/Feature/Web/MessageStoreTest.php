<?php

use App\Models\Flat;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Event;
use App\Notifications\PropertyMessageNotification;
use App\Events\ConversationCreated;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Notifications\AnonymousNotifiable;

it('does not allow unauthenticated user to store a message for listing', function() {
    $response = $this->post('/message');

    $response->assertStatus(302);
});

it('validates the request details', function (){
    $user = User::factory()->create();
    actingAs($user)
        ->post('/message')->assertSessionHasErrors([
            'full_name',
            'email',
            'message_text',
            'phone_number', 
            'owner_type'
        ]);
});

it('stores a message for a listing', function () {
    // Create a user and authenticate them
    $owner = User::factory()->create();
    $user1 = User::factory()->create();
    $faker = Faker::create();
    // Mock the necessary dependencies
    Notification::fake();
    Event::fake();

    actingAs($owner);
    $flat = Flat::factory()->create([
        'user_id' => $owner->id
    ]);
    $propertyUserEmail = $flat->user->email;

    $data = [
        'full_name' => $faker->firstName,
        'email' => $faker->email,
        'message_text' => $faker->sentence(5),
        'phone_number' => 3465732947,
        'owner_type' => 'flat',
        'owner_id' => $flat->id
    ];
 
    // Make a request to the index method
    $response = actingAs($user1)
        ->post('/message', $data);

    //$response->assertStatus(200);

    $this->assertDatabaseHas('messages', [
        'user_id' => $user1->id,
        'full_name' => $data['full_name'],
        'email' => $data['email'],
        'message_text' => $data['message_text'],
        'phone_number' => 3465732947,
        'receiver_id' => $owner->id,
        'owner_id' => $flat->id
    ]);

    // Additional assertions for message saving, Notification, and broadcasting logic
    // Assert a notification was sent
    Notification::assertSentTo(
        new AnonymousNotifiable,
        PropertyMessageNotification::class,
        function ($notification, $channels, $notifiable) use ($propertyUserEmail) {
            return $notifiable->routes['mail'] === $propertyUserEmail;
        }
    );

    $message = Message::latest()->get();

    // Assert a conversation was created
    $this->assertDatabaseHas('conversations', [
        'body' => $data['message_text'],
        'message_id' => $message->first()->id,
        'user_id' => $user1->id,
    ]);

    // Retrieve the conversation to assert relationships
    $conversation = Conversation::where('message_id', $message->first()->id)->first();

    // Assert the conversation is associated with the correct users
    $this->assertTrue($conversation->users->contains($user1));
    $this->assertTrue($conversation->users->contains($owner));

    Event::assertDispatched(ConversationCreated::class);
    broadcast(new ConversationCreated($conversation))->toOthers();
    
    // Assert the response has the correct Inertia view with the paginated messages
    $response->assertRedirect('/dashboard');
});
