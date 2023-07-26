<?php

namespace App\Http\Resources\Roommate;

use App\Http\Resources\AdvertiserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class RoommateMessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'model' => 'App\Models\Roommate',
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'type' => Str::replace('_', ' ', $this->room_size->name) ?? '',
            'area' => $this->area,
            'city' => $this->city,
            'images' => $this->images,
            'user_id' => $this->user_id,
            'views' => $this->views(),
            'created_at' => $this->created_at->toDateTimeString(),
            'advertiser' => $this->whenLoaded('advertiser', function () {
                return new AdvertiserResource($this->advertiser);
            }),
        ];
    }
}
