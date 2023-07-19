<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class PropertyResource extends JsonResource
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
            'model' => $request->type,
            'title' => $this->title,
            'description' => $this->description,
            'images' => $this->images ? $this->images : $this->owner->images,
            'size' => $this->size,
            'user_id' => $this->user_id ? $this->user_id : $this->owner->user_id,
            'type' => $this->type ? Str::replace('_', ' ', $this->type->name) : Str::replace('_', ' ', $this->owner->type->name),
            'created_at' => $this->created_at->toDateTimeString(),
            'address' => [
                'address_1' => $this->address ? $this->address->address_1 : $this->owner->address->address_1,
                'area' => $this->address ? $this->address->area : $this->owner->address->area,
            ],
            'advertiser' => [
                'first_name' => $this->advertiser ? $this->advertiser->first_name : $this->owner->advertiser->first_name,
            ],
            // 'advertiser' => $this->whenLoaded('advertiser', function () {
            //     return new AdvertiserResource($this->advertiser);
            // }),
            'views' => $this->views(), 
        ];
    }
}
