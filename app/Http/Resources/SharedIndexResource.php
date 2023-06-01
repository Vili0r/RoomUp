<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SharedIndexResource extends JsonResource
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
            'title' => $this->title,
            'available_rooms' => $this->available_rooms,
            'live_at' => $this->live_at,
            'created_at' => $this->created_at->toDateTimeString(),
            'images' => $this->images,
        ];
    }
}
