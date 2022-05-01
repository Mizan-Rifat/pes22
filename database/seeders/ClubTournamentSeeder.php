<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClubTournamentSeeder extends Seeder {

	public function run() {

		$arrays = [
			[
				"club_id" => 1,
				"tournament_id" => 1,
			],
			[
				"club_id" => 2,
				"tournament_id" => 1,
			],
			[
				"club_id" => 3,
				"tournament_id" => 1,
			],
			[
				"club_id" => 4,
				"tournament_id" => 1,
			],
			[
				"club_id" => 5,
				"tournament_id" => 1,
			],
			[
				"club_id" => 6,
				"tournament_id" => 1,
			],
			[
				"club_id" => 8,
				"tournament_id" => 1,
			],
			[
				"club_id" => 11,
				"tournament_id" => 2,
			],
			[
				"club_id" => 12,
				"tournament_id" => 2,
			],
			[
				"club_id" => 13,
				"tournament_id" => 2,
			],
			[
				"club_id" => 14,
				"tournament_id" => 2,
			],
			[
				"club_id" => 15,
				"tournament_id" => 2,
			],
			[
				"club_id" => 16,
				"tournament_id" => 2,
			],
			[
				"club_id" => 17,
				"tournament_id" => 2,
			],
			[
				"club_id" => 18,
				"tournament_id" => 2,
			],
			[
				"club_id" => 19,
				"tournament_id" => 2,
			],
			[
				"club_id" => 20,
				"tournament_id" => 2,
			],
			[
				"club_id" => 21,
				"tournament_id" => 3,
			],
			[
				"club_id" => 22,
				"tournament_id" => 3,
			],
			[
				"club_id" => 23,
				"tournament_id" => 3,
			],
			[
				"club_id" => 24,
				"tournament_id" => 3,
			],
			[
				"club_id" => 25,
				"tournament_id" => 3,
			],
			[
				"club_id" => 26,
				"tournament_id" => 3,
			],
			[
				"club_id" => 27,
				"tournament_id" => 3,
			],
			[
				"club_id" => 28,
				"tournament_id" => 3,
			],
			[
				"club_id" => 29,
				"tournament_id" => 3,
			],
			[
				"club_id" => 30,
				"tournament_id" => 3,
			],
			[
				"club_id" => 31,
				"tournament_id" => 4,
			],
			[
				"club_id" => 32,
				"tournament_id" => 4,
			],
			[
				"club_id" => 33,
				"tournament_id" => 4,
			],
			[
				"club_id" => 34,
				"tournament_id" => 4,
			],
			[
				"club_id" => 35,
				"tournament_id" => 4,
			],
			[
				"club_id" => 36,
				"tournament_id" => 4,
			],
			[
				"club_id" => 37,
				"tournament_id" => 4,
			],
			[
				"club_id" => 38,
				"tournament_id" => 4,
			],
			[
				"club_id" => 1,
				"tournament_id" => 5,
			],
			[
				"club_id" => 2,
				"tournament_id" => 5,
			],
			[
				"club_id" => 3,
				"tournament_id" => 5,
			],
			[
				"club_id" => 4,
				"tournament_id" => 5,
			],
			[
				"club_id" => 5,
				"tournament_id" => 5,
			],
			[
				"club_id" => 6,
				"tournament_id" => 5,
			],
			[
				"club_id" => 7,
				"tournament_id" => 5,
			],
			[
				"club_id" => 8,
				"tournament_id" => 5,
			],
			[
				"club_id" => 11,
				"tournament_id" => 6,
			],
			[
				"club_id" => 12,
				"tournament_id" => 6,
			],
			[
				"club_id" => 13,
				"tournament_id" => 6,
			],
			[
				"club_id" => 14,
				"tournament_id" => 6,
			],
			[
				"club_id" => 15,
				"tournament_id" => 6,
			],
			[
				"club_id" => 16,
				"tournament_id" => 6,
			],
			[
				"club_id" => 17,
				"tournament_id" => 6,
			],
			[
				"club_id" => 18,
				"tournament_id" => 6,
			],
			[
				"club_id" => 21,
				"tournament_id" => 7,
			],
			[
				"club_id" => 22,
				"tournament_id" => 7,
			],
			[
				"club_id" => 23,
				"tournament_id" => 7,
			],
			[
				"club_id" => 24,
				"tournament_id" => 7,
			],
			[
				"club_id" => 25,
				"tournament_id" => 7,
			],
			[
				"club_id" => 26,
				"tournament_id" => 7,
			],
			[
				"club_id" => 27,
				"tournament_id" => 7,
			],
			[
				"club_id" => 28,
				"tournament_id" => 7,
			],
			[
				"club_id" => 31,
				"tournament_id" => 8,
			],
			[
				"club_id" => 32,
				"tournament_id" => 8,
			],
			[
				"club_id" => 33,
				"tournament_id" => 8,
			],
			[
				"club_id" => 34,
				"tournament_id" => 8,
			],
			[
				"club_id" => 35,
				"tournament_id" => 8,
			],
			[
				"club_id" => 36,
				"tournament_id" => 8,
			],
			[
				"club_id" => 37,
				"tournament_id" => 8,
			],
			[
				"club_id" => 38,
				"tournament_id" => 8,
			],
			[
				"club_id" => 1,
				"tournament_id" => 9,
			],
			[
				"club_id" => 2,
				"tournament_id" => 9,
			],
			[
				"club_id" => 3,
				"tournament_id" => 9,
			],
			[
				"club_id" => 4,
				"tournament_id" => 9,
			],
			[
				"club_id" => 11,
				"tournament_id" => 9,
			],
			[
				"club_id" => 12,
				"tournament_id" => 9,
			],
			[
				"club_id" => 13,
				"tournament_id" => 9,
			],
			[
				"club_id" => 14,
				"tournament_id" => 9,
			],
			[
				"club_id" => 21,
				"tournament_id" => 9,
			],
			[
				"club_id" => 22,
				"tournament_id" => 9,
			],
			[
				"club_id" => 23,
				"tournament_id" => 9,
			],
			[
				"club_id" => 24,
				"tournament_id" => 9,
			],
			[
				"club_id" => 31,
				"tournament_id" => 9,
			],
			[
				"club_id" => 32,
				"tournament_id" => 9,
			],
			[
				"club_id" => 33,
				"tournament_id" => 9,
			],
			[
				"club_id" => 34,
				"tournament_id" => 9,
			],
			[
				"club_id" => 7,
				"tournament_id" => 1,
			],
			[
				"club_id" => 9,
				"tournament_id" => 1,
			],
			[
				"club_id" => 10,
				"tournament_id" => 1,
			],
			[
				"club_id" => 39,
				"tournament_id" => 4,
			],
			[
				"club_id" => 40,
				"tournament_id" => 4,
			]
		];

		foreach ($arrays as $array) {
			DB::table('club_tournament')->insert([
				'club_id' => $array['club_id'],
				'tournament_id' => $array['tournament_id']
			]);
		}
	}
}
