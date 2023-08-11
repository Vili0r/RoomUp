<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class RoomSharedResource extends JsonResource
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
            'size' => $this->size,
            'type' => Str::replace('_', ' ', $this->type->name) ?? '',
            'what_i_am' => Str::replace('_', ' ', $this->what_i_am->name) ?? '',
            // 'current_flatmate_age' => $this->current_flatmate_age,
            // 'current_flatmate_smoker' => $this->current_flatmate_smoker,
            // 'current_flatmate_pets' => $this->current_flatmate_pets,
            // 'current_flatmate_occupation' => $this->current_flatmate_occupation,
            // 'current_flatmate_gender' => $this->current_flatmate_gender,
            // 'current_flatmate_hobbies' => $this->current_flatmate_hobbies ?? '',
            'images' => $this->images,
            'amenities' => AmenitiesResource::collection($this->whenLoaded('amenities')),
            'address' => $this->whenLoaded('address', function () {
                return new AddressSinglePropertyResource($this->address);
            }),
            'advertiser' => $this->whenLoaded('advertiser', function () {
                return new AdvertiserResource($this->advertiser);
            }),
            'transport' => $this->whenLoaded('transport', function () {
                return new TransportSinglePropertyResource($this->transport);
            }),
        ];
    }
}
