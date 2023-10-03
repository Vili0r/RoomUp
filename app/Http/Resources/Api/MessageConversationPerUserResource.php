<?php

namespace App\Http\Resources\Api;

use App\Http\Resources\UserConversationResource;
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
            'message_text' => strlen($this->message_text) > 20 ? substr($this->message_text, 0, 20) . '...' : ($this->message_text),
            'owner' => [
                'id' => $this->owner->id,
                'title' => $this->owner->title,
                'receiver' => $this->whenLoaded('user', function () {
                    return new UserConversationResource($this->owner->user);
                }),
                'address_1' => $this->owner_type === "App\Models\Room" ? 
                        $this->owner->owner->address->address_1 : (
                        $this->owner->address ? $this->owner->address->address_1 : $this->owner->city
                    ),
                'area' => $this->owner_type === "App\Models\Room" ? 
                        $this->owner->owner->address->area : (
                        $this->owner->address ? $this->owner->address->area : $this->owner->area
                    ),
            ],
        ];
    }
}
