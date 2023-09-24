<?php

namespace App\Http\Controllers\Api\Conversation;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Events\ConversationReplyCreated;
use App\Models\Conversation;

class ConversationReplyController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Conversation $conversation)
    {
        $request->validate([
            'body' => 'string|required|max:500',
        ]);

        $this->authorize('reply', $conversation);

        $reply = new Conversation;

        $reply->body = $request->body;
        $reply->message_id = $conversation->message_id;

        $reply->user()->associate($request->user());
        $conversation->replies()->save($reply);

        $reply->touchLastReply();

        $reply->save();
        $conversation->touchLastReply();

        broadcast(new ConversationReplyCreated($reply, $request->user()))->toOthers();
        
        return response()->json("Message sent successfully", 200);
    }
}
