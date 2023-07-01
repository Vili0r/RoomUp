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
            'images' => $this->images,
            'size' => $this->size,
            'user_id' => $this->user_id,
            'type' => Str::replace('_', ' ', $this->type->name) ?? '',
            'created_at' => $this->created_at->toDateTimeString(),
            'address' => $this->whenLoaded('address', function () {
                return new AddressResource($this->address);
            }),
            'advertiser' => $this->whenLoaded('advertiser', function () {
                return new AdvertiserResource($this->advertiser);
            }),
            'views' => $this->views(), 
        ];
    }
}
