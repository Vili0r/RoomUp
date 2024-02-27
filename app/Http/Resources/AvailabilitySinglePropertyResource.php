<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class AvailabilitySinglePropertyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'available_from' => $this->available_from->format('Y-m-d'),
            'minimum_stay' => $this->minimum_stay ?? '',
            'maximum_stay' =>  $this->maximum_stay ?? '',
            'days_available' =>  $this->days_available ?? '',
            'short_term' => $this->short_term ? "Short term" : "Long term",
        ];
    }
}
