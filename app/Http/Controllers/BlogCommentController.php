<?php

namespace App\Http\Controllers;

use App\Http\Resources\Blog\CommentIndexResource;
use App\Models\Blog;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class BlogCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Blog $blog)
    {
        $comment = $blog->comments()->with(['blog'])->approved()->get();

        return CommentIndexResource::collection($comment);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Blog $blog)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'], 
            'content' => ['required', 'max:500']
        ]);

        $comment = $blog->comments()->create([
            'name' => $request->name,
            'email' => $request->email,
            'content' => $request->content,
        ]);
 
        return new CommentIndexResource($comment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Blog $blog, Comment $comment): RedirectResponse
    {
        $this->authorize('approve comments');
        
        $comment->update([
            'approved' => true
        ]);

        return to_route('admin.comments.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog, Comment $comment): RedirectResponse
    {
        $this->authorize('delete comments');

        $comment->delete();

        return to_route('admin.comments.index');
    }
}
