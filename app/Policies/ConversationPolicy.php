<?php

namespace App\Policies;

use App\Models\Conversation;
use App\Models\User;

class ConversationPolicy
{
    public function reply(User $user, Conversation $conversation)
    {
        return $this->affect($user, $conversation);
    }
    
    public function show(User $user, Conversation $conversation)
    {
        return $this->affect($user, $conversation);
    }

    public function affect(User $user, Conversation $conversation)
    {
        return $user->isInConversation($conversation);
    }
}
