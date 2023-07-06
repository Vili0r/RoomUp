<?php

namespace App\Events;

use App\Http\Resources\ConversationResource;
use App\Models\Conversation;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ConversationReplyCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    /**
     * Create a new event instance.
     */
    public function __construct(public Conversation $conversation, $user)
    {
        $this->user = $user;
    }

    public function broadcastWith()
    {
        return [
            'id' => $this->conversation->id,
            'body' => $this->conversation->body,
            'message_id' => $this->conversation->message_id,
            'parent_id' => $this->conversation->parent ? $this->conversation->parent->id : '',
            'user_id' => $this->conversation->user_id,
            'replies' => $this->conversation->replies,
            'created_at' => $this->conversation->created_at->diffForHumans(),
            'last_reply' => $this->conversation->last_reply ? $this->conversation->last_reply->diffForHumans() : null,
        ];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('conversation.' . $this->conversation->parent->id),
        ];
    }
}
