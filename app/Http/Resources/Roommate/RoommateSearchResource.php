<?php

namespace App\Http\Resources\Roommate;

use App\Http\Resources\AvailabilityFlatSearchResultResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class RoommateSearchResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'model' => 'roommate',
            'id' => $this->id,
            'title' => $this->title,
            'budget' => $this->budget,
            'searching_for' => $this->searching_for ?? '',
            'area' => $this->area,
            'city' => $this->city,
            'images' => $this->images,
            'favouritedBy' => $this->favouritedBy($request->user()),
            'views' => $this->views(),
            'availability' => $this->whenLoaded('availability', function () {
                return new AvailabilityFlatSearchResultResource($this->availability);
            }),
        ];
    }
}
