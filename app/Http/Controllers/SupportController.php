<?php

namespace App\Http\Controllers;

use App\Events\ConversationCreated;
use App\Http\Resources\ConversationResource;
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
        if(auth()->id() === 6) {
            return '';
        }

        $messageContent = 'Hi, how can I help you today?';
        $existingMessage = Message::where('receiver_id', auth()->id())
            ->where('message_text', $messageContent)
            ->first();
       
        if(!$existingMessage){
            $message = Message::create([
                'user_id' => 6,
                'full_name' => 'Support',
                'email' => 'support@roomup.gr',
                'message_text' => $messageContent,
                'phone_number' => '123456789',
                'receiver_id' => auth()->id(),
                'owner_id' => 1,
                'owner_type' => 'App\Models\Support',
            ]);

            $sentMessage = [
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'messageText' => $messageContent,              
            ];

            Notification::route('mail', 'support@roomup.gr')
                ->notify(new CustomerSupportNotification($sentMessage));

            $existingConversation = Conversation::whereHas('users', function ($query) {
                $query->where('user_id', 6);
            })
                ->where('message_id', $message->id)
                ->first();
                
                if (!$existingConversation) {
                    //Start a conversation
                    $conversation = Conversation::create([
                        'body' => $messageContent,
                        'message_id' => $message->id,
                        'user_id' => 6,
                    ]);
    
                    $conversation->user()->associate(6);
                    $conversation->touchLastReply();
        
                    $conversation->users()->sync(array_unique(
                        array_merge([6], [auth()->id()])
                    ));
        
                    $conversation->load(['users']);
        
                    broadcast(new ConversationCreated($conversation))->toOthers();
                } 

            $conversation = Conversation::where('user_id', 6)
                ->where('body', 'Hi, how can I help you today?')
                ->where('message_id', $message->id)
                ->first();
            
            $this->loadConversationResources($conversation);

            return new ConversationResource($conversation);
        } 

        $conversation = Conversation::where('user_id', 6)
            ->where('body', 'Hi, how can I help you today?')
            ->where('message_id', $existingMessage->id)
            ->first();
            
        $this->loadConversationResources($conversation);

        return new ConversationResource($conversation);
    }
    
    protected function loadConversationResources($conversation)
    {
        $this->authorize('show', $conversation);

        if ($conversation->isReply()) {
            abort(404);
        }
    
        $conversation->load([
            'user', 
            'message.owner', 
            'parent', 
            'message.user', 
            'replies' => function ($query) {
                $query->limit(10);
            }]);
    }
}
