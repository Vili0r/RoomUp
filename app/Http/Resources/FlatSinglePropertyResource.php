<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class FlatSinglePropertyResource extends JsonResource
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
            'type' => Str::replace('_', ' ', $this->type->name) ?? '',
            'cost' => $this->cost,
            'what_i_am' => Str::replace('_', ' ', $this->what_i_am->name) ?? '',
            //'furnished' => $this->furnished,
            'images' => $this->images,
            'favouritedBy' => $this->favouritedBy(auth()->user()),
            'amenities' => AmenitiesResource::collection($this->whenLoaded('amenities')),
            'address' => $this->whenLoaded('address', function () {
                return new AddressSinglePropertyResource($this->address);
            }),
            'advertiser' => $this->whenLoaded('advertiser', function () {
                return new AdvertiserResource($this->advertiser);
            }),
            'availability' => $this->whenLoaded('availability', function () {
                return new AvailabilityResource($this->availability);
            }),
        ];
    }
}
