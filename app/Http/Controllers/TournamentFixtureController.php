<?php

namespace App\Http\Controllers;

use App\Http\Resources\FixtureResource;
use App\Models\Tournament;
use Illuminate\Http\Request;

class TournamentFixtureController extends Controller {

	public function index() {
		//
	}

	public function store(Request $request) {
		//
	}


	public function show(Tournament $tournament) {
		return FixtureResource::collection($tournament->fixtures->load('team1', 'team2'));
	}


	public function update(Request $request, $id) {
		//
	}


	public function destroy($id) {
		//
	}
}
