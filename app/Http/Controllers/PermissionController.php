<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller {

	public function index() {
		return Permission::all();
	}

	public function store(Request $request) {
		$validatedData = $request->validate([
			'name' => [
				'required', 'string',
				Rule::unique(Permission::class)
			],
			'guard_name' => Rule::in(array_keys(config('auth.guards')))
		]);

		$permission = Permission::create($validatedData);
		return $permission;
	}

	public function show(Permission $permission) {
		return $permission;
	}

	public function update(Request $request, Permission $permission) {
		$validatedData = $request->validate([
			'name' => [
				'string', Rule::unique(Permission::class)->ignore($permission)
			],
			'guard_name' => Rule::in(array_keys(config('auth.guards')))
		]);

		$permission->update($validatedData);
		return $permission;
	}

	public function destroy(Permission $permission) {
		return $permission->delete();
	}
}
