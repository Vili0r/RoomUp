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
            'model' => "flat",
            'id' => $this->id,
            'title' => $this->title,
            'cost' => $this->cost,
            'images' => $this->images,
            'favouritedBy' => $this->favouritedBy($request->user()),
            'views' => $this->views(),
            'long' => $this->address->long,
            'address' => $this->whenLoaded('address', function () {
                return new AddressRoomSearchResultResource($this->address);
            }),
            'availability' => $this->whenLoaded('availability', function () {
                return new AvailabilityFlatSearchResultResource($this->availability);
            }),
        ];
    }
}
