<?php

use App\Http\Controllers\SupportController;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Event;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Message;
use App\Models\Conversation;
use App\Http\Resources\ConversationResource;
use App\Notifications\CustomerSupportNotification;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Set up necessary user and other models
    $this->user = User::factory()->create([
        'phone_number' => '4923842342424'
    ]);
    $this->adminUser = User::factory()->create(['id' => 6]);
    // Authenticate as the user
    $this->actingAs($this->user);
    // Fake notifications and events
    Notification::fake();
    Broadcast::shouldReceive('event')->andReturnTrue();
    Event::fake();
});

it('returns empty response for user with ID 6', function () {
    $this->actingAs($this->adminUser);
    $request = new Request();
    $response = app(SupportController::class)($request);
    expect($response)->toBe('');
});

// it('sends notification and creates conversation if message does not exist', function () {
//     $request = new Request();
//     $response = app(SupportController::class)($request);

//     // Assert notification was sent
//     Notification::assertSentTo(
//         [$this->adminUser],
//         CustomerSupportNotification::class
//     );

//     // Assert conversation was created
//     $conversation = Conversation::where('user_id', 6)->first();
//     expect($conversation)->not->toBeNull();

//     // Assert the response is a ConversationResource
//     expect($response)->toBeInstanceOf(ConversationResource::class);
// });

// it('returns existing conversation as resource', function () {
//     // Create an existing message and conversation
//     $message = Message::create([
//         'user_id' => 6,
//         'full_name' => 'Support',
//         'email' => 'support@roomup.gr',
//         'message_text' => 'Hi, how can I help you today?',
//         'phone_number' => '123456789',
//         'receiver_id' => auth()->id(),
//         'owner_id' => 1,
//         'owner_type' => 'App\Models\Support',
//     ]);
//     $conversation = Conversation::create([
//         'body' => 'Hi, how can I help you today?',
//         'message_id' => $message->id,
//         'user_id' => 6
//     ]);

//     $request = new Request();
//     $response = app(SupportController::class)($request);

//     // Assert the response is a ConversationResource
//     expect($response)->toBeInstanceOf(ConversationResource::class);
//     // Assert the conversation is the one we created
//     expect($response->resource->id)->toEqual($conversation->id);
// });