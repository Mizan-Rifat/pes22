<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class ClubRequest extends FormRequest {

	public function authorize() {
		return true;
	}

	public function rules() {
		return [
			'name' => ['string', Rule::unique('clubs')->ignore($this->route('club')->id)],
			'slug' => ['string', Rule::unique('clubs')->ignore($this->route('club')->id)],
			'approved' => ['boolean'],
			'logo' =>  ['image'],
		];
	}

	protected function prepareForValidation() {
		$this->merge([
			'slug' => Str::slug($this->name, ""),
			'approved' => filter_var($this->approved, FILTER_VALIDATE_BOOL)
		]);
	}
}
