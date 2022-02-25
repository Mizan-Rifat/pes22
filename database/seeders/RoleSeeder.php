<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder {
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run() {
		$roles = ['super_admin', 'admin', 'moderator'];

		$dataItems = array_map(
			fn ($role) =>
			[
				'name' => $role,
				'guard_name' => 'web'
			],
			$roles
		);

		DB::table('roles')->insert($dataItems);
	}
}
