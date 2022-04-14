<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest {


	public function authorize() {
		return true;
	}

	public function rules() {
		return [
			'name' => ['string', 'max:255'],
			'email' => [
				'string',
				'email',
				'max:255',
				// Rule::unique(User::class),
			],
		];
	}
}
