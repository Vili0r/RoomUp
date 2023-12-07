<?php

namespace App\Http\Controllers;

use App\Events\ConversationCreated;
use App\Http\Requests\MessageStoreRequest;
use App\Http\Resources\MessageResource;
use App\Http\Resources\PropertyMessageResource;
use App\Http\Resources\Roommate\RoommateMessageResource;
use App\Models\Conversation;
use App\Models\Flat;
use App\Models\Message;
use App\Models\Room;
use App\Models\Roommate;
use App\Notifications\PropertyMessageNotification;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Notification;

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
            $property = Flat::findOrFail($request->id);
            $property->load(['address', 'advertiser']);
            
            return Inertia::render('Message/Create',[
                'property' => new PropertyMessageResource($property),
            ]);
        } elseif ($request->type == 'room') {
            $property = Room::findOrFail($request->id);
            $property->load(['owner.address', 'owner.advertiser']);

            return Inertia::render('Message/Create',[
                'property' => new PropertyMessageResource($property),
            ]);
        } elseif ($request->type == 'roommate') {
            $roommate = Roommate::findOrFail($request->id);
            $roommate->load('advertiser');

            return Inertia::render('Message/Create',[
                'property' => new RoommateMessageResource($roommate),
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MessageStoreRequest $request): RedirectResponse
    {
        if ($request->owner_type == 'flat') {
            $property = Flat::with(['user'])->findOrFail($request->owner_id);
            $propertyUserId = $property->user_id;
            $propertyUserEmail = $property->user->email;
        } elseif ($request->owner_type == 'room') {
            $property = Room::with(['owner.user'])->findOrFail($request->owner_id);
            $propertyUserId = $property->owner->user_id;
            $propertyUserEmail = $property->owner->user->email;
        } elseif ($request->owner_type == 'roommate') {
            $property = Roommate::with(['user'])->findOrFail($request->owner_id);
            $propertyUserId = $property->user_id;
            $propertyUserEmail = $property->user->email;
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
                'receiver_id' => $propertyUserId,
            ]);

            $message = [
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'propertyTitle' => $property->title,
                'messageText' => $request->message_text,              
            ];

            Notification::route('mail', $propertyUserEmail)
                ->notify(new PropertyMessageNotification($message));
        } 

        if($sentMessages < 2){
            //Start a conversation
            $conversation = Conversation::create([
                'body' => $request->message_text,
                'message_id' => $text->id,
                'user_id' => auth()->id(),
            ]);

            $conversation->user()->associate(auth()->user());
            $conversation->touchLastReply();

            $conversation->users()->sync(array_unique(
                array_merge([$propertyUserId], [auth()->id()])
            ));

            $conversation->load(['users']);

            broadcast(new ConversationCreated($conversation))->toOthers();
        }

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
