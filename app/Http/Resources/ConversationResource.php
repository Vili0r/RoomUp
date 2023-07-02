<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConversationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'body' => $this->body,
            'message_id' => $this->message_id,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at->diffForHumans(),
            'last_reply' => $this->last_reply ? $this->last_reply->diffForHumans() : null,
            'message' => $this->whenLoaded('message', function () {
                return new MessageConversationResource($this->message);
            }),
            'sender' => $this->whenLoaded('user', function () {
                return new UserConversationResource($this->user);
            }),
        ];
    }
}
