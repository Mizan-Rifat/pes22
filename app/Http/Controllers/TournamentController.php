<?php

namespace App\Http\Controllers;

use App\Http\Requests\TournamentRequest;
use App\Http\Resources\TournamentResource;
use App\Models\Club;
use App\Models\Tournament;
use Illuminate\Http\Request;

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
		$tournament->load('clubs');
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

	public function updateClubs(Request $request, Tournament $tournament) {
		$validatedData = $request->validate([
			'clubs' => ['required', 'array'],
			'clubs.*' => ['numeric', 'exists:clubs,id'],
		]);
		$tournament->clubs()->sync($validatedData['clubs']);
		$tournament->load('clubs');

		return response()->json([
			'message' => 'Successfully updated',
			'data' => new TournamentResource($tournament)
		], 200);
	}
}
