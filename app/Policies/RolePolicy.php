<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class RolePolicy {
	use HandlesAuthorization, RolePermissionPolicy;

	public function viewAny(User $user) {
		return $user->hasPermissionTo('role_browse');
	}

	public function view(User $user) {
		return $user->hasPermissionTo('role_show');
	}

	public function create(User $user) {
		return $user->hasPermissionTo('role_store');
	}

	public function update(User $user) {
		return $user->hasPermissionTo('role_update');
	}

	public function delete(User $user) {
		return $user->hasPermissionTo('role_destroy');
	}
}
