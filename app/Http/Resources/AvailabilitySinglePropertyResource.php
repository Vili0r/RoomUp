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
            'minimum_stay' => Str::replace('_', ' ', $this->minimum_stay->name) ?? '',
            'maximum_stay' =>  Str::replace('_', ' ', $this->maximum_stay->name) ?? '',
            'days_available' =>  Str::replace('_', ' ', $this->days_available->name) ?? '',
            'short_term' => $this->short_term ? "Short term" : "Long term",
        ];
    }
}
