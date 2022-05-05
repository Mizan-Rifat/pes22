<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlayerModelRequest;
use App\Http\Resources\PlayerModelResource;
use App\Models\PlayerModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PlayerModelController extends Controller {

	public function index() {
		return PlayerModelResource::collection(PlayerModel::all());
	}


	public function store(Request $request) {
		//
	}


	public function show(PlayerModel $playerModel) {
		return new PlayerModelResource($playerModel);
	}


	public function update(PlayerModelRequest $request, PlayerModel $playerModel) {
		$validatedData = $request->validated();
		$playerModel->update($validatedData);

		return response()->json([
			'message' => 'Successfully updated',
			'data' => new PlayerModelResource($playerModel)
		], 200);
	}

	public function updateAvatar(Request $request, PlayerModel $playerModel) {
		$validatedData = $request->validate([
			'avatar' => ['required', 'image']
		]);

		$oldAvatar = $playerModel->avatar;
		$avatar = $validatedData['avatar']->store('players', 'public_images');
		$playerModel->avatar = $avatar;
		$playerModel->save();

		Storage::disk('public_images')->delete($oldAvatar);

		return response()->json([
			'message' => 'Avatar updated',
			'data' => new PlayerModelResource($playerModel)
		], 200);
	}


	public function destroy(PlayerModel $playerModel) {
		$avatar = $playerModel->avatar;
		$playerModel->delete();
		Storage::disk('public_images')->delete($avatar);

		return response()->json([
			'message' => 'Successfully deleted',
		], 200);
	}
}
