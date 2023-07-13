<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomSearchResultResource extends JsonResource
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
            'images' => $this->images !== null ? array_merge($this->owner->images, $this->images) : $this->owner->images,
            'favouritedBy' => $this->favouritedBy(auth()->user()),
            'views' => $this->views(),
            'owner' => [
                'model' => "shared",
                'id' => $this->owner->id,
                'title' => $this->owner->title,
                'description' => $this->owner->description,
                'cost' => $this->owner->cost ?? '',
                'size' => $this->owner->size,
                'type' => $this->owner->type,
                'images' => $this->owner->images,
                'favouritedBy' => $this->owner->favouritedBy(auth()->user()),
                'created_at' => $this->owner->created_at->format('Y-m-d'), 
                'address' => $this->whenLoaded('address', function () {
                    return AddressResource::collection($this->owner->address);
                }), 
            ],
        ];
    }
}
