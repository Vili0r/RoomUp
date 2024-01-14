<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class ReportedResource extends JsonResource
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
            'details' => $this->details,
            'reason' => Str::replace('_', ' ', $this->reason->name),
            'status' => Str::replace('_', ' ', $this->status->name),
            'resolved_at' => $this->resolved_at ? $this->resolved_at->format('Y-m-d') : '',
            'model' => strtolower(substr($this->owner_type, strrpos($this->owner_type, '\\') + 1)),
            'owner' => [
                'id' => $this->owner->id ?? '',
                'title' => $this->owner->title ?? $this->owner->owner->title ?? '',
            ],
        ];
    }
}
