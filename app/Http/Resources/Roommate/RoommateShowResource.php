<?php

namespace App\Http\Resources\Roommate;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoommateShowResource extends JsonResource
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
            'budget' => $this->budget,
            'city' => $this->city,
            'area' => $this->area,
            'live_at' => $this->live_at ? $this->live_at->format('Y-m-d') : "",
            'featured' => $this->featured ?? '',
            'available' => $this->available ?? '',
            'created_at' => $this->created_at ? $this->created_at->format('Y-m-d') : "",
            'images' => $this->images,
        ];
    }
}
