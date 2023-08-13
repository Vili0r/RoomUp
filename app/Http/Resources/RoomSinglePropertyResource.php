<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

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
            'room_furnished' => Str::replace('_', ' ', $this->room_furnished->name) ?? '',
            'available_from' => $this->available_from->format('Y-m-d'),
            'minimum_stay' => Str::replace('_', ' ', $this->minimum_stay->name) ?? '',
            'maximum_stay' =>  Str::replace('_', ' ', $this->maximum_stay->name) ?? '',
            'days_available' =>  Str::replace('_', ' ', $this->days_available->name) ?? '',
            'short_term' => $this->short_term ? "Short term" : "Long term",
            'images' => $this->images !== null ? array_merge($this->owner->images, $this->images) : $this->owner->images,
            'favouritedBy' => $this->favouritedBy(auth()->user()),
            'owner' => $this->whenLoaded('owner', function () {
                return new RoomSharedResource($this->owner);
            }),
        ];
    }
}
