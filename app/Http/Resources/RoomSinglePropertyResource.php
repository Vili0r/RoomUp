<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomSinglePropertyResource extends JsonResource
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
            'description' => $this->sub_description,
            'room_cost' => $this->room_cost,
            'available_from' => $this->available_from->format('Y-m-d'),
            'minimum_stay' => $this->minimum_stay,
            'maximum_stay' => $this->maximum_stay,
            'days_available' => $this->days_available,
            'short_term' => $this->short_term,
            'images' => $this->images !== null ? array_merge($this->owner->images, $this->images) : $this->owner->images,
            'favouritedBy' => $this->favouritedBy(auth()->user()),
            'owner' => $this->whenLoaded('owner', function () {
                return new RoomSharedResource($this->owner);
            }),
        ];
    }
}
