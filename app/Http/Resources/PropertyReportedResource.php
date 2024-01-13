<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyReportedResource extends JsonResource
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
            'model' => $request->type,
            'title' => $this->title ? $this->title : $this->owner->title,
            'user_id' => $this->user_id ? $this->user_id : $this->owner->user_id,
        ];
    }
}
