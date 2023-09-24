<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressRoomSearchResultResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'address_1' => $this->address_1,
            'area' => $this->area, 
            'lat' => $this->lat, 
            'long' => $this->long, 
        ];
    }
}
