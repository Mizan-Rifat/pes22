<?php

namespace App\Http\Controllers;

use App\Http\Requests\TournamentRequest;
use App\Http\Resources\TournamentResource;
use App\Models\Tournament;

class TournamentController extends Controller {

	public function index() {
		return TournamentResource::collection(Tournament::all());
	}


	public function store(TournamentRequest $request) {
		$validatedData = $request->validated();
		$tournament = Tournament::create($validatedData);

		return response()->json([
			'message' => 'Tournament successfully created',
			'data' => new TournamentResource($tournament)
		], 200);
	}


	public function show(Tournament $tournament) {
		return new TournamentResource($tournament);
	}

	public function update(TournamentRequest $request, Tournament $tournament) {
		$validatedData = $request->validated();
		$tournament->update($validatedData);

		return response()->json([
			'message' => 'Tournament successfully updated',
			'data' => new TournamentResource($tournament)
		], 200);
	}

	public function destroy(Tournament $tournament) {
		return $tournament->delete();
	}
}
