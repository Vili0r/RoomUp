<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConversationSupportResource extends JsonResource
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
            'parent_id' => $this->parent ? $this->parent->id : '',
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
