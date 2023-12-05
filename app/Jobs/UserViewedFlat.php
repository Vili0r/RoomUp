<?php

namespace App\Jobs;

use App\Models\Flat;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UserViewedFlat implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user;
    public $flat;
    /**
     * Create a new job instance.
     */
    public function __construct(?User $user, Flat $flat)
    {
        $this->user = $user;
        $this->flat = $flat;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // $viewed = $this->user->viewedFlats;
       
        // if($viewed->contains($this->flat)){
        //     $viewed->where('id', $this->flat->id)->first()->pivot->increment('count');
        //     return;
        // }

        // $this->user->viewedFlats()->attach($this->flat, [
        //     'count' => 1
        // ]);
        if ($this->user) {
            $viewed = $this->user->viewedFlats;
            
            if($viewed->contains($this->flat)){
                $viewed->where('id', $this->flat->id)->first()->pivot->increment('count');
                return;
            }
            
            $this->user->viewedFlats()->attach($this->flat, [
                'count' => 1
            ]);
        } else {
    
            $flatExists = $this->flat->viewedUsers->contains('user_id', null);

            if ($flatExists) {
                $pivot = $this->flat->viewedUsers->where('user_id', null)->first()->pivot;
                $pivot->increment('count');
            } else {
                $this->flat->viewedUsers()->attach(null, [
                    'count' => 1
                ]);
            }
        }
    }
}
