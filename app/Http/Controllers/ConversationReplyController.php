<?php

namespace App\Http\Controllers;

use App\Http\Resources\ConversationResource;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class ConversationReplyController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Conversation $conversation): Response
    {
        $request->validate([
            'body' => 'string|required|max:500',
        ]);

        $this->authorize('reply', $conversation);

        $reply = new Conversation;

        $reply->body = $request->body;
        $reply->message_id = $conversation->message_id;

        $reply->user()->associate(auth()->user());
        $reply->touchLastReply();

        $reply->save();
        $conversation->touchLastReply();

        return Inertia::render('Conversation/Index', [
            'conversation' => new ConversationResource($conversation)
        ]);;
    }
}
