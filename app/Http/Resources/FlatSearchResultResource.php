<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FlatSearchResultResource extends JsonResource
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
            'size' => $this->size,
            'type' => $this->type,
            'live_at' => $this->live_at,
            'cost' => $this->cost,
            'created_at' => $this->created_at->toDateTimeString(),
            'images' => $this->images,
            'address' => $this->whenLoaded('address', function () {
                return new AddressResource($this->address);
            }),
            'availability' => $this->whenLoaded('availability', function () {
                return new AvailabilityResource($this->availability);
            }),
        ];;
    }
}
