<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminVerificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id, 
            'first_name' => $this->first_name, 
            'last_name' => $this->last_name, 
            'email' => $this->email, 
            'gender' => $this->gender, 
            'phone_number' => $this->phone_number, 
            'avatar' => $this->avatar, 
            'facebook_link' => $this->facebook_link, 
            'instagram_link' => $this->instagram_link, 
            'tiktok_link' => $this->tiktok_link, 
            'linkedin_link' => $this->linkedin_link, 
            'verification' => new UserVerificationResource($this->verification),
        ];
    }
}
