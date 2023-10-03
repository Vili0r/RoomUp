<?php

namespace App\Http\Controllers\Api\Conversation;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Api\ConversationsPerUserResource;

class ConversationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $conversations = $request->user()->conversations()->get();
        $conversations->load(['user', 'message.owner', 'message.user']);

        return ConversationsPerUserResource::collection($conversations);
    }
}
