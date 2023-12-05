<?php

namespace App\Jobs;

use App\Models\Roommate;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UserViewedRoommate implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user;
    public $roommate;
    /**
     * Create a new job instance.
     */
    public function __construct(?User $user, Roommate $roommate)
    {
        $this->user = $user;
        $this->roommate = $roommate;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // $viewed = $this->user->viewedRoommates;

        // if($viewed->contains($this->roommate)){
        //     $viewed->where('id', $this->roommate->id)->first()->pivot->increment('count');
        //     return;
        // }

        // $this->user->viewedRoommates()->attach($this->roommate, [
        //     'count' => 1
        // ]);
        if ($this->user) {
            $viewed = $this->user->viewedRoommates;
            
            if($viewed->contains($this->roommate)){
                $viewed->where('id', $this->roommate->id)->first()->pivot->increment('count');
                return;
            }
            
            $this->user->viewedRoommates()->attach($this->roommate, [
                'count' => 1
            ]);
        } else {
    
            $roommateExists = $this->roommate->viewedUsers->contains('user_id', null);

            if ($roommateExists) {
                $pivot = $this->roommate->viewedUsers->where('user_id', null)->first()->pivot;
                $pivot->increment('count');
            } else {
                $this->roommate->viewedUsers()->attach(null, [
                    'count' => 1
                ]);
            }
        }
    }
}
