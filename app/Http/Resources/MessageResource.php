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
            'model' => strtolower(substr($this->owner_type, strrpos($this->owner_type, '\\') + 1)),
            'owner' => [
                'id' => $this->owner->id,
                'title' => $this->owner->title,
                'description' => $this->owner->description,
                'cost' => $this->owner->cost ?? '',
                'size' => Str::replace('_', ' ', $this->owner->size->name) ?? '',
                'type' => Str::replace('_', ' ', $this->owner->type->name) ?? '',
                'images' => $this->owner->images,
                'created_at' => $this->owner->created_at->format('Y-m-d'), 
                'address_1' => $this->owner->address->address_1,
                'area' => $this->owner->address->area,
            ],
        ];
    }
}
