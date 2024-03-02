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
            'title' => htmlspecialchars_decode(mb_convert_encoding($this->title, 'UTF-8', 'UTF-8')),
            'slug' => $this->slug,
            'excerpt' => htmlspecialchars_decode(mb_convert_encoding(substr(strip_tags($this->body), 0, 200), 'UTF-8', 'UTF-8')) . '...',
            'published_at' => $this->published_at->format('Y-m-d'),
            'author' => $this->whenLoaded('author', function () {
                return new AuthorResource($this->author);
            }),
        ];
    }
}
