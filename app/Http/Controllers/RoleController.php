<?php

namespace App\Http\Controllers;

use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller {

	public function index() {
		return Role::all();
	}

	public function store(Request $request) {
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
		return $role;
	}

	public function update(Request $request, Role $role) {
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
		return $role->delete();
	}
}
