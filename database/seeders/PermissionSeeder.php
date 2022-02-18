<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionSeeder extends Seeder {
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run() {
		$actions = collect(['browse', 'store', 'show', 'update', 'destroy']);
		$tables = collect(['user', 'permission', 'role']);

		$data = $tables->crossJoin($actions);
		$dataItems = $data->map(function ($item) {
			return [
				'name' => $item[0] . '_' . $item[1],
				'guard_name' => 'web'
			];
		});

		DB::table('permissions')->insert($dataItems->toArray());
	}
}
