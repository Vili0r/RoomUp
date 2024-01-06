<?php

namespace App\Http\Controllers;

use App\Events\ConversationCreated;
use App\Models\Conversation;
use App\Models\Message;
use App\Notifications\CustomerSupportNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class SupportController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $messageContent = 'Hi, how can I help you today?';
        $existingMessage = Message::where('user_id', auth()->id())
            ->where('message_text', $messageContent)
            ->first();
       
        if(!$existingMessage){
            $message = Message::create([
                'user_id' => auth()->id(),
                'full_name' => auth()->user()->first_name,
                'email' => auth()->user()->email,
                'message_text' => $messageContent,
                'phone_number' => '123456789',
                'receiver_id' => 6,
                'owner_id' => 1,
                'owner_type' => Support::class,
            ]);

            $sentMessage = [
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'messageText' => $messageContent,              
            ];

            Notification::route('mail', 'support@roomup.gr')
                ->notify(new CustomerSupportNotification($sentMessage));

            $existingConversation = Conversation::whereHas('users', function ($query) {
                $query->where('user_id', auth()->id());
            })->where('message_id', $message->id)->first();
            
            if (!$existingConversation) {
                //Start a conversation
                $conversation = Conversation::create([
                    'body' => $messageContent,
                    'message_id' => $message->id,
                    'user_id' => auth()->id(),
                ]);
    
                $conversation->user()->associate(auth()->user());
                $conversation->touchLastReply();
    
                $conversation->users()->sync(array_unique(
                    array_merge([6], [auth()->id()])
                ));
    
                $conversation->load(['users']);
    
                broadcast(new ConversationCreated($conversation))->toOthers();
            } else {
                // Use the existing conversation
                $conversation = $existingConversation;
            }
            return back();
        }
        return '';
    }
}
