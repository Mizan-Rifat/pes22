<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PermissionPolicy {
	use HandlesAuthorization;

	public function viewAny(User $user) {
		return $user->hasPermissionTo('permissison_browse');
	}

	public function view(User $user) {
		return $user->hasPermissionTo('permissison_show');
	}

	public function create(User $user) {
		return $user->hasPermissionTo('permissison_store');
	}

	public function update(User $user) {
		return $user->hasPermissionTo('permissison_update');
	}

	public function delete(User $user) {
		return $user->hasPermissionTo('permissison_destroy');
	}
}
