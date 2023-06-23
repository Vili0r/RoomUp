<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SharedSearchResultResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'model' => "shared",
            'id' => $this->id,
            'title' => $this->title,
            'available_rooms' => $this->available_rooms,
            'live_at' => $this->live_at,
            'size' => $this->size,
            'created_at' => $this->created_at->toDateTimeString(),
            'images' => $this->images,
            'favouritedBy' => $this->favouritedBy(auth()->user()),
            'address' => $this->whenLoaded('address', function () {
                return new AddressResource($this->address);
            }),
            'rooms' => RoomResource::collection($this->whenLoaded('rooms')),
        ];
    }
}
