<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller {

	public function index() {
		return User::all();
	}

	public function store(Request $request) {
		//
	}

	public function show(User $user) {
		return $user;
	}

	public function update(Request $request, User $user) {
		//
	}

	public function destroy(User $user) {
		return $user->delete();
	}
}
