<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class MessageResource extends JsonResource
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
            'email' => $this->email,
            'message_text' => $this->message_text,
            'user_id' => $this->user_id,
            'model' => strtolower(substr($this->owner_type, strrpos($this->owner_type, '\\') + 1)),
            'owner' => [
                'id' => $this->owner->id,
                'title' => $this->owner->title,
                'description' => substr($this->owner->description, 0, 100) . '...',
                'cost' => $this->owner->cost ?? '',
                'user_id' => $this->owner->user_id,
                'size' => $this->owner->size ? Str::replace('_', ' ', $this->owner->size->name) : Str::replace('_', ' ', $this->owner->room_size->name),
                'type' => $this->owner->type ? Str::replace('_', ' ', $this->owner->type->name) : Str::replace('_', ' ', $this->owner->searching_for->name),
                'images' => $this->owner->images,
                'created_at' => $this->owner->created_at->format('Y-m-d'), 
                'address_1' => $this->owner->address ? $this->owner->address->address_1 : $this->owner->city,
                'area' => $this->owner->address ? $this->owner->address->area : $this->owner->area,
            ],
        ];
    }
}
