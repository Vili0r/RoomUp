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
            'message_text' => $this->message_text,
            'model' => strtolower(substr($this->owner_type, strrpos($this->owner_type, '\\') + 1)),
            'owner' => [
                'id' => $this->owner->id,
                'title' => strtolower(substr($this->owner_type, strrpos($this->owner_type, '\\') + 1)) === 'support' 
                        ? 'Customer Support' 
                        : ($this->owner->title ?? $this->owner->owner->title),
                'description' => $this->owner->description ? substr($this->owner->description, 0, 100) . '...' :  substr($this->owner->owner->description, 0, 100) . '...',
                'size' => $this->owner->size ? $this->owner->size : $this->owner->room_size,
                'type' => $this->owner_type === "App\Models\Room" ? 
                        $this->owner->owner->type : (
                            $this->owner->type ?
                        $this->owner->type :
                        $this->owner->searching_for
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
