<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
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
            'sub_description' => $this->sub_description,
            'room_size' => $this->room_size,
            'room_cost' => $this->room_cost,
            'room_deposit' => $this->room_deposit,
            'room_furnished' => $this->room_furnished,
            'room_references' => $this->room_references,
            'available_from' => $this->available_from->format('Y-m-d'),
            'minimum_stay' => $this->minimum_stay,
            'maximum_stay' => $this->maximum_stay,
            'days_available' => $this->days_available,
            'available' => $this->available,
            'live_at' => $this->live_at,
            'short_term' => $this->short_term,
            'images' => $this->images,
        ];
    }
}
