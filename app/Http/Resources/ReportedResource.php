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
                'id' => $this->owner->id,
                'title' => $this->owner->title ?? $this->owner->owner->title,
                'description' => $this->owner->description ? substr($this->owner->description, 0, 100) . '...' :  substr($this->owner->owner->description, 0, 100) . '...',
                'images' => $this->owner->images ? $this->owner->images : $this->owner->owner->images,
                'created_at' => $this->owner->created_at->format('Y-m-d'), 
                'address_1' => $this->owner_type === "App\Models\Room" ? 
                        $this->owner->owner->address->address_1 : (
                        $this->owner->address ? $this->owner->address->address_1 : $this->owner->city
                    ),
                'area' => $this->owner_type === "App\Models\Room" ? 
                        $this->owner->owner->address->area : (
                        $this->owner->address ? $this->owner->address->area : $this->owner->area
                    ),
                ],
        ];
    }
}
