<?php

namespace App\Http\Resources\Roommate;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoommateIndexResource extends JsonResource
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
            'title' => $this->title,
            'budget' => $this->budget,
            'live_at' => $this->live_at,
            'created_at' => $this->created_at->toDateTimeString(),
            'hasQuest' => auth()->user()->roommate ? true : false,
            'images' => $this->images,
        ];;
    }
}
