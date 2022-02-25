<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionController extends Controller {

	// public function givePermissionToUser(Request $request) {
	// 	$validatedData = $request->validate([
	// 		'user' => ['required', 'numeric', 'exists:users,id'],
	// 		'permission' => ['required', 'array'],
	// 		'permission.*' => ['numeric', 'exists:permissions,id'],
	// 	]);

	// 	$user = User::find($validatedData['user']);
	// 	return $user->givePermissionTo($validatedData['permission']);
	// }

	// public function revokePermissionFromUser(User $user, Permission $permission) {
	// 	return $user->revokePermissionTo($permission);
	// }

	public function givePermissionToRole(Request $request) {
		$this->authorize('assignRolePermission', Role::class);
		$validatedData = $request->validate([
			'role' => ['required', 'numeric', 'exists:roles,id'],
			'permission' => ['array'],
			'permission.*' => ['numeric', 'exists:permissions,id'],
		]);
		$role = Role::find($validatedData['role']);
		return $role->syncPermissions($validatedData['permission']);
	}

	public function revokePermissionFromRole(Role $role, Permission $permission) {
		$this->authorize('revokeRolePermission', Role::class);
		return $role->revokePermissionTo($permission);
	}

	public function assignRoleToUser(Request $request) {
		$this->authorize('assignRolePermission', Role::class);
		$validatedData = $request->validate([
			'user' => ['required', 'numeric', 'exists:users,id'],
			'role' => ['array'],
			'role.*' => ['numeric', 'exists:roles,id'],
		]);
		$user = User::find($validatedData['user']);
		return $user->syncRoles($validatedData['role']);
	}

	public function removeRoleFromUser(User $user, Role $role) {
		$this->authorize('revokeRolePermission', Role::class);
		return $user->removeRole($role);
	}

	public function getAllPermissionsOfUser(User $user) {
		$this->authorize('viewRolePermission', Role::class);
		return $user->getAllPermissions();
	}

	public function getAllRolesOfUser(User $user) {
		$this->authorize('viewRolePermission', Role::class);
		return $user->getRoleNames();
	}

	public function getAllPermissionsOfRole(Role $role) {
		$this->authorize('viewRolePermission', Role::class);
		return $role->getAllPermissions();
	}
}
