<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SharedShowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'available_rooms' => $this->available_rooms,
            'live_at' => $this->live_at ? $this->live_at->format('Y-m-d') : "",
            'images' => $this->images,
            'address' => $this->whenLoaded('address', function () {
                return new AddressResource($this->address);
            }),
            'rooms' => SharedRoomResource::collection($this->whenLoaded('rooms')),
        ];
    }
}
