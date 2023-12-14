<?php

namespace App\Http\Controllers\Api\Message;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Flat;
use App\Models\Message;
use App\Models\Room;
use App\Models\Roommate;
use App\Notifications\PropertyMessageNotification;
use Illuminate\Support\Facades\Notification;
use App\Events\ConversationCreated;
use App\Http\Requests\MessageStoreRequest;

class StoreMessageController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(MessageStoreRequest $request)
    {
        if ($request->owner_type == 'flat') {
            $property = Flat::with(['user'])->findOrFail($request->owner_id);
            $propertyUserId = $property->user_id;
            $propertyUserEmail = $property->user->email;
        } elseif ($request->owner_type == 'room') {
            $property = Room::with(['owner.user'])->findOrFail($request->owner_id);
            $propertyUserId = $property->owner->user_id;
            $propertyUserEmail = $property->owner->user->email;
        } elseif ($request->owner_type == 'roommate') {
            $property = Roommate::with(['user'])->findOrFail($request->owner_id);
            $propertyUserId = $property->user_id;
            $propertyUserEmail = $property->user->email;
        }

        //Save message because we need to throttle them to avoid spams

        $sentMessages = Message::where('user_id', $request->user()->id)
            ->where('created_at', '>', now()->subMinute())
            ->count();

        if($sentMessages < 5) {
            $text = $property->messages()->create([
                'user_id' => $request->user()->id,
                'full_name' => $request->full_name,
                'email' => $request->email,
                'message_text' => $request->message_text,
                'phone_number' => $request->phone_number,
                'receiver_id' => $propertyUserId,
            ]);

            $message = [
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'propertyTitle' => $property->title,
                'messageText' => $request->message_text,              
            ];

            Notification::route('mail', $propertyUserEmail)
                ->notify(new PropertyMessageNotification($message));
        } 

        if($sentMessages < 2){
            //Start a conversation
            $conversation = Conversation::create([
                'body' => $request->message_text,
                'message_id' => $text->id,
                'user_id' => $request->user()->id,
            ]);

            $conversation->user()->associate($request->user());
            $conversation->touchLastReply();

            $conversation->users()->sync(array_unique(
                array_merge([$propertyUserId], [$request->user()->id])
            ));

            $conversation->load(['users']);

            broadcast(new ConversationCreated($conversation))->toOthers();
        }

        return response()->json("Message created successfully", 200);
    }
}
