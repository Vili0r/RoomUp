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
            'type' =>  $this->type ?? '',
            'cost' => $this->cost,
            'what_i_am' =>  $this->what_i_am ?? '',
            'furnished' =>  $this->furnished ?? '',
            'images' => $this->images,
            'favouritedBy' => $this->favouritedBy($request->user()),
            'amenities' => AmenitiesResource::collection($this->whenLoaded('amenities')),
            'url' => route('property.show', ['flat', $this->id]),
            'address' => $this->whenLoaded('address', function () {
                return new AddressSinglePropertyResource($this->address);
            }),
            'advertiser' => $this->whenLoaded('advertiser', function () {
                return new AdvertiserResource($this->advertiser);
            }),
            'availability' => $this->whenLoaded('availability', function () {
                return new AvailabilitySinglePropertyResource($this->availability);
            }),
            'transport' => $this->whenLoaded('transport', function () {
                return new TransportSinglePropertyResource($this->transport);
            }),
        ];
    }
}
