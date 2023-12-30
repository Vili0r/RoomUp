<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'looking_for' => $this->looking_for, 
            'phone_number' => $this->phone_number, 
            'avatar' => $this->avatar, 
            'facebook_link' => $this->facebook_link, 
            'instagram_link' => $this->instagram_link, 
            'tiktok_link' => $this->tiktok_link, 
            'linkedin_link' => $this->linkedin_link, 
            'birthdate' => $this->birthdate ? $this->birthdate->format('Y-m-d') : "",
            'verification' => new UserVerificationResource($this->verification),
            'roles' => $this->getRoleNames(),
            'permissions' => $this->getPermissionNames(),
            'userRoles' => RoleResource::collection($this->whenLoaded('roles')),
            'userPermissions' => PermissionResource::collection($this->whenLoaded('permissions')),
        ];
    }
}
