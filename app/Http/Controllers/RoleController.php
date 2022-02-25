<?php

namespace App\Http\Controllers;

use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class RoleController extends Controller {

	public function index() {
		$this->authorize('viewAny', Role::class);
		return Role::all();
	}

	public function store(Request $request) {
		$this->authorize('create', Role::class);
		$validatedData = $request->validate([
			'name' => [
				'required', 'string',
				Rule::unique(Role::class)
			],
			'guard_name' => Rule::in(array_keys(config('auth.guards')))
		]);

		$role = Role::create($validatedData);
		return $role;
	}

	public function show(Role $role) {
		$this->authorize('view', Role::class);
		return $role;
	}

	public function update(Request $request, Role $role) {
		$this->authorize('update', Role::class);
		$validatedData = $request->validate([
			'name' => [
				'string', Rule::unique(Role::class)->ignore($role)
			],
			'guard_name' => Rule::in(array_keys(config('auth.guards')))
		]);

		$role->update($validatedData);
		return $role;
	}

	public function destroy(Role $role) {
		$this->authorize('delete', Role::class);
		return $role->delete();
	}
}
