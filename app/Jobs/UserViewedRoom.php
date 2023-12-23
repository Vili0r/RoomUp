<?php

namespace App\Jobs;

use App\Models\Room;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UserViewedRoom implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user;
    public $room;
    /**
     * Create a new job instance.
     */
    public function __construct(User $user, Room $room)
    {
        $this->user = $user;
        $this->room = $room;
    }
    
    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $viewed = $this->user->viewedRooms();
       
        if($viewed->contains($this->room)){
            $viewed->where('id', $this->room->id)->first()->pivot->increment('count');
            return;
        }

        $this->user->viewedRooms()()->attach($this->room, [
            'count' => 1
        ]);
    }
}
