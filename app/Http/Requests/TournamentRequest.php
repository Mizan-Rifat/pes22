<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class TournamentRequest extends FormRequest {




	public function authorize() {
		return true;
	}

	public function rules() {

		$storeRules = [
			'name' => ['required', 'regex:/^[a-zA-Z ]+$/', Rule::unique('tournaments', 'name')],
			'slug' => ['required', 'regex:/^[a-z]+$/', 'alpha', Rule::unique('tournaments', 'slug')],
			'format' => ['required', 'string'],
			'leg' => ['required', 'min:1', 'max:2', 'numeric'],
			'rounds' => ['required', 'min:1', 'max:18', 'numeric'],
			'active' => ['required', 'boolean'],
		];

		$updateRules = [
			'name' => ['regex:/^[a-zA-Z ]+$/', Rule::unique('tournaments', 'name')->ignore($this->route('tournament')->id)],
			'slug' => ['regex:/^[a-z]+$/', 'alpha', Rule::unique('tournaments', 'slug')->ignore($this->route('tournament')->id)],
			'format' => ['string'],
			'leg' => ['min:1', 'max:2', 'numeric'],
			'rounds' => ['min:1', 'max:18', 'numeric'],
			'active' => ['boolean'],
		];

		return request()->isMethod('tournament.create') ? $storeRules : $updateRules;
	}

	protected function prepareForValidation() {
		$this->merge([
			'slug' => Str::slug($this->name, ""),
			// 'approved' => filter_var($this->approved, FILTER_VALIDATE_BOOL)
		]);
	}
}
