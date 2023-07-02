<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageStoreRequest;
use App\Http\Resources\MessageResource;
use App\Http\Resources\PropertyResource;
use App\Models\Conversation;
use App\Models\Flat;
use App\Models\Message;
use App\Models\Shared;
use App\Notifications\PropertyMessageNotification;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Notification;
use Illuminate\Database\Eloquent\Builder;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $messages = Message::with(['owner'])
            ->where('receiver_id', auth()->id())
            ->orWhere('user_id', auth()->id())
            ->latest()
            ->paginate(5);
        
        return Inertia::render('Message/Index',[
            'messages' => MessageResource::collection($messages)
        ]);
    }
    
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response 
    {
        if ($request->type == 'flat') {
            $property = Flat::with(['address', 'advertiser', 'viewedUsers'])->findOrFail($request->id);
        } elseif ($request->type == 'shared') {
            $property = Shared::with(['address', 'advertiser', 'viewedUsers'])->findOrFail($request->id);
        }
        
        return Inertia::render('Message/Create',[
            'property' => new PropertyResource($property),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'full_name' => ['string', 'required', 'max:255'],
            'email' => ['string', 'required', 'email', 'max:255'],
            'message_text' => ['required', 'max:500'],
            'phone_number' => ['required', 'max_digits:12'],
        ]);

        if ($request->owner_type == 'flat') {
            $property = Flat::with(['user'])->findOrFail($request->owner_id);
        } elseif ($request->owner_type == 'shared') {
            $property = Shared::with(['user'])->findOrFail($request->owner_id);
        }

        //Save message because we need to throttle them to avoid spams

        $sentMessages = Message::where('user_id', auth()->id())
            ->where('created_at', '>', now()->subMinute())
            ->count();

        if($sentMessages < 5) {
            $text = $property->messages()->create([
                'user_id' => auth()->id(),
                'full_name' => $request->full_name,
                'email' => $request->email,
                'message_text' => $request->message_text,
                'phone_number' => $request->phone_number,
                'receiver_id' => $property->user_id,
            ]);

            $message = [
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'propertyTitle' => $property->title,
                'messageText' => $request->message_text,              
            ];

            Notification::route('mail', $property->user->email)
                ->notify(new PropertyMessageNotification($message));
        }

        //Start a conversation
        $conversation = Conversation::create([
            'body' => $request->message_text,
            'message_id' => $text->id,
            'user_id' => auth()->id(),
        ]);

        $conversation->user()->associate(auth()->user());
        $conversation->touchLastReply();

        $conversation->users()->sync(array_unique(
            array_merge([$property->user_id], [auth()->id()])
        ));

        return to_route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
