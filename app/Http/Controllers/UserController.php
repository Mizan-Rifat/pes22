<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller {

	public function index() {
		return UserResource::collection(User::all());
	}

	public function store(Request $request) {
		//
	}

	public function show(User $user) {
		return new UserResource($user);
	}

	public function update(UserRequest $request, User $user) {

		$validatedData = $request->validated();
		return $validatedData;
	}

	public function destroy(User $user) {
		return $user->delete();
	}
}
