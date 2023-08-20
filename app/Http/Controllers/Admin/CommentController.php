<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Blog\CommentResource;
use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class CommentController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $comments = CommentResource::collection(
            Comment::query()
                ->with(['blog'])
                ->when($request->input('search'), function($query, $search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%");
                })
                ->when($request->input('approved'), function($query, $approved) {
                    $query->where('approved', $approved);
                })
                ->latest()
                ->paginate(7)
            );

        return Inertia::render('Admin/Comment/Index', [
            'comments' => $comments,
            'filters' => $request->only(['search', 'approved'])
        ]);
    }
}
