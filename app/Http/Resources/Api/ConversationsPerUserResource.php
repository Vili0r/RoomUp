<?php

namespace App\Http\Resources\Api;

use App\Http\Resources\UserConversationResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConversationsPerUserResource extends JsonResource
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
            'user_id' => $this->user_id,
            'last_reply' => $this->last_reply ? $this->last_reply->diffForHumans() : null,
            'message' => $this->whenLoaded('message', function () {
                return new MessageConversationPerUserResource($this->message);
            }),
            'sender' => $this->whenLoaded('user', function () {
                return new UserConversationResource($this->user);
            }),
        ];
    }
}
