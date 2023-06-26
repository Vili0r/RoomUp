<?php

namespace App\Jobs;

use App\Models\Shared;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UserViewedShared implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user;
    public $shared;
    /**
     * Create a new job instance.
     */
    public function __construct(User $user, Shared $shared)
    {
        $this->user = $user;
        $this->shared = $shared;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $viewed = $this->user->viewedShareds;

        if($viewed->contains($this->shared)){
            $viewed->where('id', $this->shared->id)->first()->pivot->increment('count');
            return;
        }

        $this->user->viewedShareds()->attach($this->shared, [
            'count' => 1
        ]);
    }
}
