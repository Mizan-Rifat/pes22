<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class PlayerModelRequest extends FormRequest {

	public function authorize() {
		return true;
	}

	public function rules() {
		$storeRules = [
			'name' => ['required', 'string'],
			'position' => ['required', 'string', 'exists:player_positions,position'],
		];

		$updateRules = [
			'name' => ['string'],
			'position' => ['string', 'exists:player_positions,position'],
		];

		return request()->isMethod('player-models.create') ? $storeRules : $updateRules;
	}

	protected function prepareForValidation() {
		$this->merge([
			'position' => Str::upper($this->position),
		]);
	}
}
