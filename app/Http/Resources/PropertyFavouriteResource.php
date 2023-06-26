<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyFavouriteResource extends JsonResource
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
            'description' => $this->description,
            'cost' => $this->cost ?? '',
            'size' => $this->size,
            'type' => $this->type,
            'images' => $this->images,
            'favouritedBy' => $this->favouritedBy(auth()->user()),
            'created_at' => $this->created_at->format('Y-m-d'), 
        ];
    }
}
