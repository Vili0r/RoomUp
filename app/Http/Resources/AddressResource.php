<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
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
            'address_2' => $this->address_2,
            'area' => $this->area,
            'city' => $this->city,
            'post_code' => $this->post_code,
            'lat' => $this->lat,
            'long' => $this->long,
            'display_name' => $this->display_name,
        ];
    }
}
