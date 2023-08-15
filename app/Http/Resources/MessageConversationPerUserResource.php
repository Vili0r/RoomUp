<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageConversationPerUserResource extends JsonResource
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
            'full_name' => $this->full_name,
            'message_text' => substr($this->message_text, 0, 20) . '...',
            'owner' => [
                'id' => $this->owner->id,
                'title' => $this->owner->title,
                'receiver' => $this->whenLoaded('user', function () {
                    return new UserConversationResource($this->owner->user);
                }),
            ],
        ];
    }
}
