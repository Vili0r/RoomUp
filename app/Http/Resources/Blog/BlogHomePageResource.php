<?php

namespace App\Http\Resources\Blog;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogHomePageResource extends JsonResource
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
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => substr(strip_tags($this->body), 0, 200) . '...',
            'published_at' => $this->published_at->format('Y-m-d'),
            'author' => $this->whenLoaded('author', function () {
                return new AuthorResource($this->author);
            }),
        ];
    }
}
