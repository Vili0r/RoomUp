<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SharedSearchRoomResultResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'address' => $this->whenLoaded('address', function () {
                return new AddressRoomSearchResultResource($this->address);
            }),
        ];
    }
}
