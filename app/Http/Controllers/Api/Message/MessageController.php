<?php

namespace App\Http\Controllers\Api\Message;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Api\MessageResource;
use App\Models\Message;

class MessageController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $messages = MessageResource::collection(
            Message::with(['owner'])
                ->where('receiver_id', $request->user()->id)
                ->orWhere('user_id', $request->user()->id)
                ->latest()
                ->paginate(5)
            );
        
        return $messages;
    }
}
