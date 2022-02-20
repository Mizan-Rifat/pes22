<?php

namespace App\Policies;

use App\Models\User;

trait RolePermissionPolicy {

	public function viewRolePermission(User $user) {
		return $user->hasPermissionTo('role_permissison_browse');
	}

	public function assignRolePermission(User $user) {
		return $user->hasPermissionTo('role_permissison_store');
	}

	public function revokeRolePermission(User $user) {
		return $user->hasPermissionTo('role_permissison_destroy');
	}
}
