<?php

namespace App\Http\Resources\Quest;

use App\Http\Resources\AdvertiserResource;
use App\Http\Resources\AmenitiesResource;
use App\Http\Resources\AvailabilityResource;
use App\Http\Resources\FlatmateResource;
use App\Http\Resources\HobbiesResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuestEditResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'budget' => $this->budget,
            'searching_for' => $this->searching_for,
            'age' => $this->age,
            'smoker' => $this->smoker,
            'pets' => $this->pets,
            'occupation' => $this->occupation,
            'gender' => $this->gender,
            'area' => $this->area,
            'city' => $this->city,
            'images' => $this->images,
            'amenities' => AmenitiesResource::collection($this->whenLoaded('amenities')),
            'hobbies' => HobbiesResource::collection($this->whenLoaded('hobbies')),
            'advertiser' => $this->whenLoaded('advertiser', function () {
                return new AdvertiserResource($this->advertiser);
            }),
            'availability' => $this->whenLoaded('availability', function () {
                return new AvailabilityResource($this->availability);
            }),
            'flatmate' => $this->whenLoaded('flatmate', function () {
                return new FlatmateResource($this->flatmate);
            }),
        ];
    }
}
