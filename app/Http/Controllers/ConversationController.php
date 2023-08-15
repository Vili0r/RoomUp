<?php

namespace App\Http\Controllers;

use App\Http\Resources\ConversationResource;
use App\Http\Resources\ConversationsPerUserResource;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ConversationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $conversations = $request->user()->conversations()->get();
        $conversations->load(['user', 'message.owner', 'message.user']);

        return Inertia::render('Conversation/Index', [
            'conversations' => ConversationsPerUserResource::collection($conversations)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Conversation $conversation): Response
    {
        $this->authorize('show', $conversation);

        if($conversation->isReply()){
            abort(404);
        }

        $conversation->load(['user', 'message.owner', 'parent', 'message.user', 'replies' => function ($query) {
            $query->paginate(10); // Limit to 20 replies per conversation
        }]);

        $conversations = $request->user()->conversations()->get();
        $conversations->load(['user', 'message.owner', 'message.user']);

        return Inertia::render('Conversation/Index', [
            'getConversation' => new ConversationResource($conversation),
            'conversations' => ConversationsPerUserResource::collection($conversations)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conversation $conversation)
    {
        //
    }
}
