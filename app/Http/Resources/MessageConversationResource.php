<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class MessageConversationResource extends JsonResource
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
            'initial' => substr($this->full_name, 0, 1),
            'email' => $this->email,
            'message_text' => substr($this->message_text, 0, 20) . '...',
            'user_id' => $this->user_id,
            'model' => strtolower(substr($this->owner_type, strrpos($this->owner_type, '\\') + 1)),
            'owner' => [
                'id' => $this->owner->id,
                'title' => $this->owner->title ? $this->owner->title : 'Customer Support',
                'description' => $this->owner->description ? substr($this->owner->description, 0, 100) . '...' : '',
                'cost' => $this->owner->cost ? $this->owner->cost : '',
                'receiver' => $this->whenLoaded('user', function () {
                    return new UserConversationResource($this->owner->user);
                }),
                'images' => $this->owner->images ? $this->owner->images : '',
                'created_at' => $this->owner->created_at->format('Y-m-d'), 
            ],
        ];
    }
}
