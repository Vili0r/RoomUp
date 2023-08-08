<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SharedRoomResource extends JsonResource
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
            'sub_title' => $this->sub_title,
            'room_size' => $this->room_size,
            'room_cost' => $this->room_cost,
            'available_from' => $this->available_from->format('Y-m-d'),
            'live_at' => $this->live_at ? $this->live_at->format('Y-m-d') : "",
            'images' => $this->images,
        ];
    }
}
