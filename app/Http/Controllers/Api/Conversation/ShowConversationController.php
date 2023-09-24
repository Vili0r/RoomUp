<?php

namespace App\Http\Controllers\Api\Conversation;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\ConversationResource;
use App\Http\Resources\ConversationsPerUserResource;
use App\Models\Conversation;

class ShowConversationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Conversation $conversation)
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

        return response()->json([
            'getConversation' => new ConversationResource($conversation),
            'conversations' => ConversationsPerUserResource::collection($conversations)
        ]);
    }
}
