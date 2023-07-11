<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressSearchResultResource extends JsonResource
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
            'address_1' => $this->address_1,
            'address_2' => $this->address_2,
            'area' => $this->area,
            'city' => $this->city,
            'post_code' => $this->post_code,
            'model' => strtolower(substr($this->owner_type, strrpos($this->owner_type, '\\') + 1)),
            'owner' => [
                'id' => $this->owner->id,
                'title' => $this->owner->title,
                'description' => $this->owner->description,
                'cost' => $this->owner->cost ?? '',
                'size' => $this->owner->size,
                'type' => $this->owner->type,
                'images' => $this->owner->images,
                'favouritedBy' => $this->owner->favouritedBy(auth()->user()),
                'created_at' => $this->owner->created_at->format('Y-m-d'),  
                'rooms' => $this->owner->rooms ?? RoomResource::make($this->whenLoaded($this->owner->rooms)),
                'availability' => $this->owner->availability ?? RoomResource::make($this->whenLoaded($this->owner->availability)),
                'views' => $this->owner->views(),
            ],
        ];
    }
}
