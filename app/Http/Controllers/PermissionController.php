<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller {

	public function index() {
		$this->authorize('viewAny', Permission::class);
		return Permission::all();
	}

	public function store(Request $request) {
		$this->authorize('create', Permission::class);
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
		$this->authorize('view', Permission::class);
		return $permission;
	}

	public function update(Request $request, Permission $permission) {
		$this->authorize('update', Permission::class);
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
		$this->authorize('delete', Permission::class);
		return $permission->delete();
	}
}
