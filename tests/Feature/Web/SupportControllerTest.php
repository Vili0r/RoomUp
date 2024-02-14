<?php

use App\Events\ConversationCreated;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\Support;
use App\Models\User;
use App\Notifications\CustomerSupportNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Event;

uses(RefreshDatabase::class);

it('does not create a message for user with ID 6', function () {
    // Mock the necessary dependencies
    Notification::fake();
    Event::fake();

    // Given
    $user = User::factory()->create();
    $this->actingAs($user);

    // When
    $response = $this->get(route('customer-support'));

    expect(Message::count())->toBe(0);
    // Assert the response is empty
    $response->assertNoContent();
});

it('returns conversation and resources when auth user is not 6', function () {
    // Given
    $owner = User::factory()->create(['phone_number' => '23456789012345']);
    $user = User::factory()->create(['id' => 6]);
    auth()->login($user);
    $this->actingAs($user);
    Message::create([
        'user_id' => 6,
        'full_name' => 'Support',
        'email' => 'support@roomup.gr',
        'message_text' => 'Hi, how can I help you today?',
        'phone_number' => '123456789',
        'receiver_id' => $owner->id,
        'owner_id' => 1,
        'owner_type' => 'App\Models\Support',
    ]);

     // When
    $response = actingAs($user)
        ->get(route('customer-support'));

    // Then
    $response->assertStatus(200);
    $response->assertJsonStructure([
        'id',
        'body',
        'user',
        'message',
        'parent',
        'replies',
    ]);
});

it('returns conversation and resources when auth user is 6', function () {
    // Mock the necessary dependencies
    Notification::fake();
    Event::fake();
    // Given
    $user = User::factory()->create(['id' => 6]);
    $owner = User::factory()->create(['phone_number' => '23456789012345']);
    $this->actingAs($user);

    // Mocking the conversation
    $message = Message::create([
        'user_id' => 6,
        'full_name' => 'Support',
        'email' => 'support@roomup.gr',
        'message_text' => 'Hi, how can I help you today?',
        'phone_number' => '123456789',
        'receiver_id' => $owner->id,
        'owner_id' => 1,
        'owner_type' => 'App\Models\Support',
    ]);
    $conversation = $message->conversation()->create([
        'user_id' => 6,
        'body' => 'Hi, how can I help you today?',
    ]);

    // When
    $response = actingAs($user)
        ->get(route('customer-support'));

    // Then
    // Notification::assertSentTo(
    //     new Support,
    //     CustomerSupportNotification::class,
    //     function ($notification, $notifiable) use ($user) {
    //         return $notifiable->routes['mail'] === $user->email;
    //     }
    // );

    // Assert the conversation is associated with the correct users
    $this->assertTrue($conversation->users->contains($user));
    $this->assertTrue($conversation->users->contains($owner));

    Event::assertDispatched(ConversationCreated::class);
    broadcast(new ConversationCreated($conversation))->toOthers();

    $response->assertStatus(200);
    $response->assertJsonStructure([
        'id',
        'body',
        'user',
        'message',
        'parent',
        'replies',
    ]);
});
