<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FlatShowResource extends JsonResource
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
            'description' => $this->description,
            'size' => $this->size,
            'live_at' => $this->live_at ? $this->live_at->format('Y-m-d') : "",
            'featured' => $this->featured ?? '',
            'available' => $this->available ?? '',
            'created_at' => $this->created_at->toDateTimeString(),
            'images' => $this->images,
            'address' => $this->whenLoaded('address', function () {
                return new AddressResource($this->address);
            }),
        ];
    }
}
