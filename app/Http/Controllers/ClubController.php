<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClubRequest;
use App\Http\Resources\ClubResource;
use App\Models\Club;
use Illuminate\Http\Request;

class ClubController extends Controller {

	public function index() {
		return ClubResource::collection(Club::all());
	}

	public function store(Request $request) {
		//
	}

	public function show(Club $club) {
		$club->load('owner');
		return new ClubResource($club);
	}

	public function update(ClubRequest $request, Club $club) {

		$validatedData = $request->validated();

		if (isset($validatedData['logo'])) {
			$logo = $validatedData['logo']->store('club_logo', 'public_images');
			$validatedData['logo'] = $logo;
		}

		$club->update($validatedData);

		return response()->json([
			'message' => 'Club successfully updated',
			'data' => new ClubResource($club)
		], 200);
	}

	public function destroy(Club $club) {
		// $this->authorize('delete', Club::class);
		return $club->delete();
	}
}
