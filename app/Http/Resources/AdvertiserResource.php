<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdvertiserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'display_last_name' => $this->display_last_name,
            'telephone' => $this->telephone,
            'display_telephone' => $this->display_telephone,
            'initials' => substr($this->first_name, 0, 1) . substr($this->last_name, 0, 1),
        ];
    }
}
