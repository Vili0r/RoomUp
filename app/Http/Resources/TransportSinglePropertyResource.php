<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class TransportSinglePropertyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'minutes' => Str::replace('_', ' ', $this->minutes->name) ?? '',
            'mode' => Str::replace('_', ' ', $this->mode->name) ?? '',
            'station' => Str::replace('_', ' ', $this->station->name) ?? '',
        ];
    }
}
