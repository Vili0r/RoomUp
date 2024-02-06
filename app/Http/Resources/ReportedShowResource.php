<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class ReportedShowResource extends JsonResource
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
            'model' => strtolower(substr($this->owner_type, strrpos($this->owner_type, '\\') + 1)),
            'owner' => [
                'id' => $this->owner->id ?? '',
                'title' => $this->owner->title ?? $this->owner->owner->title ?? '',
            ],
        ];
    }
}
