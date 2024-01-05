<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminUserResource extends JsonResource
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
            'avatar' => $this->avatar, 
            'birthdate' => $this->birthdate ? $this->birthdate->format('Y-m-d') : "",
            'last_login_at' => $this->last_login_at ? $this->last_login_at->format('Y-m-d') : "",
            'verification' => new AdminUserVerificationResource($this->verification),
            'roles' => $this->getRoleNames(),
            'permissions' => $this->getPermissionNames(),
            'userRoles' => RoleResource::collection($this->whenLoaded('roles')),
            'userPermissions' => PermissionResource::collection($this->whenLoaded('permissions')),
        ];
    }
}
