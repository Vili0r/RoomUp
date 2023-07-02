<?php

namespace App\Http\Controllers;

use App\Http\Resources\ConversationResource;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

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
            'conversations' => ConversationResource::collection($conversations)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Conversation $conversation)
    {
        $this->authorize('show', $conversation);
        $conversation->load(['user', 'message.owner', 'message.user']);

        return Inertia::render('Conversation/Index', [
            'conversation' => new ConversationResource($conversation)
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
