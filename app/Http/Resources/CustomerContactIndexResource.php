<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class CustomerContactIndexResource extends JsonResource
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
            'name' => $this->first_name . ' ' . $this->last_name,
            'email' => $this->email,
            'reason' => $this->reason,
            'status' => $this->status ? Str::replace('_', ' ', $this->status->name) : '',
            'resolved_at' => $this->resolved_at ? $this->resolved_at->format('Y-m-d') : '',
            'created_at' => $this->created_at->format('Y-m-d'),
        ];
    }
}
