<?php

namespace App\Http\Resources\Blog;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
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
            'content' => $this->content,
            'name' => $this->name,
            'email' => $this->email,
            'approved' => $this->approved,
            'created_at' => $this->created_at->toDateTimeString(),
            'blog' => $this->whenLoaded('blog', function () {
                return new CommentBlogResource($this->blog);
            }),
        ];
    }
}
