<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class FlatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'model' => 'flat',
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'size' => $this->size,
            'type' => $this->type,
            'cost' => $this->cost,
            'deposit' => $this->deposit,
            'what_i_am' => $this->what_i_am,
            'furnished' => $this->furnished,
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
            'availability' => $this->whenLoaded('availability', function () {
                return new AvailabilityResource($this->availability);
            }),
        ];
    }
}
