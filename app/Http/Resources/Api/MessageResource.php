<?php

namespace App\Http\Resources\Api;

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
            'message_text' => strlen($this->message_text) > 40 ? substr($this->message_text, 0, 40) > 40 . '...' : $this->message_text,
            'model' => strtolower(substr($this->owner_type, strrpos($this->owner_type, '\\') + 1)),
            'owner' => [
                'id' => $this->owner->id,
                'title' => $this->owner->title ? $this->owner->title : $this->owner->owner->title,
                'size' => $this->owner->size ? Str::replace('_', ' ', $this->owner->size->name) : Str::replace('_', ' ', $this->owner->room_size->name),
                'type' => $this->owner_type === "App\Models\Room" ? 
                        Str::replace('_', ' ', $this->owner->owner->type->name) : (
                            $this->owner->type ?
                        Str::replace('_', ' ', $this->owner->type->name) :
                        Str::replace('_', ' ', $this->owner->searching_for->name)
                    ),
                'images' => $this->owner->images ? $this->owner->images : $this->owner->owner->images,
                'created_at' => $this->owner->created_at->format('Y-m-d'), 
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
