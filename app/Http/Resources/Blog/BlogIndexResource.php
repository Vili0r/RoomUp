<?php

namespace App\Http\Resources\Blog;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogIndexResource extends JsonResource
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
            'image' => $this->image,
            'title' => htmlspecialchars_decode(mb_convert_encoding(substr($this->title, 0, 30), 'UTF-8', 'UTF-8')) . '...',
            'featured' => $this->featured,
            'published_at' => $this->published_at->format('Y-m-d'),
            'created_at' => $this->created_at->toDateTimeString(),
            'category' => $this->whenLoaded('category', function () {
                return new CategoryResource($this->category);
            }),
            'author' => $this->whenLoaded('author', function () {
                return new AuthorResource($this->author);
            }),
        ];
    }
}
