<?php

namespace App\Http\Resources\Api;

use App\Http\Resources\AddressResource;
use App\Http\Resources\AdvertiserResource;
use App\Http\Resources\AmenitiesResource;
use App\Http\Resources\FlatmateResource;
use App\Http\Resources\TransportResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SharedEditResource extends JsonResource
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
            'description' => $this->description,
            'available_rooms' => $this->available_rooms,
            'size' => $this->size,
            'type' => $this->type,
            'current_occupants' => $this->current_occupants,
            'what_i_am' => $this->what_i_am,
            'current_flatmate_age' => $this->current_flatmate_age,
            'current_flatmate_smoker' => $this->current_flatmate_smoker,
            'current_flatmate_pets' => $this->current_flatmate_pets,
            'current_flatmate_occupation' => $this->current_flatmate_occupation,
            'current_flatmate_gender' => $this->current_flatmate_gender,
            'current_flatmate_hobbies' => $this->current_flatmate_hobbies ?? '',
            'images' => $this->images,
            'amenities' => AmenitiesResource::collection($this->whenLoaded('amenities')),
            'address' => $this->whenLoaded('address', function () {
                return new AddressResource($this->address);
            }),
            'advertiser' => $this->whenLoaded('advertiser', function () {
                return new AdvertiserResource($this->advertiser);
            }),
            'transport' => $this->whenLoaded('transport', function () {
                return new TransportResource($this->transport);
            }),
            'flatmate' => $this->whenLoaded('flatmate', function () {
                return new FlatmateResource($this->flatmate);
            }),
            'rooms' => RoomResource::collection($this->whenLoaded('rooms')),
        ];
    }
}
