<?php

namespace App\Http\Resources\Roommate;

use App\Http\Resources\AdvertiserResource;
use App\Http\Resources\AmenitiesResource;
use App\Http\Resources\AvailabilitySinglePropertyResource;
use App\Http\Resources\HobbiesResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class RoommateSinglePropertyResource extends JsonResource
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
            'searching_for' => Str::replace('_', ' ', $this->searching_for->name) ?? '',
            'room_size' => Str::replace('_', ' ', $this->room_size->name) ?? '',
            'age' => $this->age,
            'smoker' => Str::replace('_', ' ', $this->smoker->name) ?? '',
            'pets' => Str::replace('_', ' ', $this->pets->name) ?? '',
            'occupation' => Str::replace('_', ' ', $this->occupation->name) ?? '',
            'gender' => Str::replace('_', ' ', $this->gender->name) ?? '',
            'area' => $this->area,
            'city' => $this->city,
            'images' => $this->images,
            'amenities' => AmenitiesResource::collection($this->whenLoaded('amenities')),
            'hobbies' => HobbiesResource::collection($this->whenLoaded('hobbies')),
            'advertiser' => $this->whenLoaded('advertiser', function () {
                return new AdvertiserResource($this->advertiser);
            }),
            'availability' => $this->whenLoaded('availability', function () {
                return new AvailabilitySinglePropertyResource($this->availability);
            }),
            'favouritedBy' => $this->favouritedBy($request->user()),
            'url' => route('single.roommate.show', $this->id)
        ];
    }
}
