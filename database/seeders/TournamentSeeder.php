<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class TournamentSeeder extends Seeder {
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run() {
		$tournaments = [
			[
				"name" => "Premier League",
				"type" => 'round_robin_league',
				'leg' => 2,
				'round' => 18,
				"active" => 1
			],
			[
				"name" => "Elite League",
				"type" => 'round_robin_league',
				'leg' => 2,
				'round' => 18,
				"active" => 1
			],
			[
				"name" => "Master League",
				"type" => 'round_robin_league',
				'leg' => 2,
				'round' => 18,
				"active" => 1
			],
			[
				"name" => "Super League",
				"type" => 'round_robin_league',
				'leg' => 2,
				'round' => 18,
				"active" => 1
			],
			[
				"name" => "Premier League Cup",
				"type" => 'knockout',
				'leg' => 1,
				'round' => 3,
				"active" => 1
			],
			[
				"name" => "Elite League Cup",
				"type" => 'knockout',
				'leg' => 1,
				'round' => 3,
				"active" => 1
			],
			[
				"name" => "Master League Cup",
				"type" => 'knockout',
				'leg' => 1,
				'round' => 3,
				"active" => 1
			],
			[
				"name" => "Super League Cup",
				"type" => 'knockout',
				'leg' => 1,
				'round' => 3,
				"active" => 1
			],
			[
				"name" => "Champions League",
				"type" => 'round_robin_knockout',
				'leg' => 1,
				'round' => 4,
				"active" => 1
			],

		];

		foreach ($tournaments as $tournament) {
			DB::table('tournaments')->insert([
				'name' => $tournament['name'],
				'slug' => strtolower(str_replace(' ', '', $tournament['name'])),
				'format' => $tournament['type'],
				'leg' => $tournament['leg'],
				'rounds' => $tournament['round'],
				'active' => $tournament['active'],
				'created_at' => Carbon::now(),
			]);
		}
	}
}
