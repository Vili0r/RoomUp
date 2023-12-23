<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomSearchResultResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'model' => 'room',
            'id' => $this->id,
            'sub_title' => $this->sub_title,
            'room_cost' => $this->room_cost,
            'available_from' => $this->available_from->format('Y-m-d'),
            'images' => $this->images !== null ? array_merge($this->owner->images, $this->images) : $this->owner->images,
            'favouritedBy' => $this->favouritedBy($request->user()),
            'views' => $this->views(),
            'long' => $this->owner->address->long,
            'owner' => $this->whenLoaded('owner', function () {
                return new SharedSearchRoomResultResource($this->owner);
            }), 
        ];
    }
}
