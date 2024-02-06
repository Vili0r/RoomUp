<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class VirtualTourIndexResource extends JsonResource
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
            'contact_name' => $this->contact_name,
            'email' => $this->email,
            'status' => Str::replace('_', ' ', $this->status->name),
            'payment_status' => Str::replace('_', ' ', $this->payment_status->name),
            'created_at' => $this->created_at ? $this->created_at->format('Y-m-d') : '',
            'completed_at' => $this->completed_at ? $this->completed_at->format('Y-m-d') : '',
            'owner' => [
                'id' => $this->owner->id ?? '',
                'title' => $this->owner->title ?? $this->owner->owner->title ?? '',
            ],
        ];
    }
}
