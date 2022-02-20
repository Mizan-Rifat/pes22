<?php

namespace App\Providers;

use App\Policies\PermissionPolicy;
use App\Policies\RolePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AuthServiceProvider extends ServiceProvider {

	protected $policies = [
		// 'App\Models\Model' => 'App\Policies\ModelPolicy',
		Role::class => RolePolicy::class,
		Permission::class => PermissionPolicy::class
	];


	public function boot() {
		$this->registerPolicies();

		//
	}
}
