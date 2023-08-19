<?php

namespace App\Http\Resources\Blog;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
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
            'title_body' => substr($this->title, 0, 50) . '...',
            'slug' => $this->slug,
            'category_id' => $this->category_id,
            'tag_id' => $this->tag_id,
            'featured' => $this->featured,
            'excerpt' => substr(strip_tags($this->body), 0, 200) . '...',
            'body_table' => substr(strip_tags($this->body), 0, 20) . '...',
            'body' => strip_tags($this->body),
            'published_at' => $this->published_at->format('Y-m-d'),
            'created_at' => $this->created_at->toDateTimeString(),
            'category' => [
                'id' => $this->category->id ?? '',
                'name' => $this->category->name ?? '',
            ],
            'author' => [
                'author' => AuthorResource::make($this->author()),
            ]
        ];
    }
}
