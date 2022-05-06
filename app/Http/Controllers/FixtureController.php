<?php

namespace App\Http\Controllers;

use App\Models\Fixture;
use App\Http\Requests\StoreFixtureRequest;
use App\Http\Requests\UpdateFixtureRequest;
use App\Http\Resources\FixtureResource;
use App\Models\Tournament;

class FixtureController extends Controller {

	use \App\traits\CreateFixtureTrait;

	public function index() {
		// return Fixture::all();
		return FixtureResource::collection(Fixture::with('team1', 'team2', 'tournament')->get());

		$tournament = Tournament::find(1);
		$tournament_id = $tournament->id;
		$tournament_leg = $tournament->leg;
		$tournament_round = $tournament->round;
		$clubIds = $tournament->clubs->map(function ($club) {
			return $club['id'];
		});

		// return	$this->createRoundRobinFixtures($tournament_id, $clubIds, $tournament_leg);
	}


	public function create() {
		//
	}


	public function store(StoreFixtureRequest $request) {
		$tournament = Tournament::find(1);
		$tournament_id = $tournament->id;
		$tournament_leg = $tournament->leg;
		$tournament_round = $tournament->round;
	}


	public function show(Fixture $fixture) {
		return $fixture;
	}


	public function edit(Fixture $fixture) {
		//
	}


	public function update(UpdateFixtureRequest $request, Fixture $fixture) {
		//
	}


	public function destroy(Fixture $fixture) {
		//
	}
}
