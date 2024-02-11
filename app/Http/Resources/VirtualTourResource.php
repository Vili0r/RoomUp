<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class VirtualTourResource extends JsonResource
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
            'status' => Str::replace('_', ' ', $this->status->name),
            'payment_status' => Str::replace('_', ' ', $this->payment_status->name),
            'completed_at' => $this->completed_at ? $this->completed_at->format('Y-m-d') : '',
        ];
    }
}
