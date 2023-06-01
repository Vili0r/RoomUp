<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Spatie\Permission\Models\Permission;

class RevokeUserPermissionController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(User $user, Permission $permission): RedirectResponse
    {
        $user->revokePermissionTo($permission);

        return to_route('admin.users.index');
    }
}
