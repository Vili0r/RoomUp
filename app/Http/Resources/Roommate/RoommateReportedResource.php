<?php

namespace App\Http\Resources\Roommate;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoommateReportedResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'model' => 'roommate',
            'id' => $this->id,
            'title' => $this->title,
            'user_id' => $this->user_id,
        ];
    }
}
