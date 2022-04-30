<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class ClubRequest extends FormRequest {
	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize() {
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules() {
		return [
			'name' => ['string', Rule::unique('clubs')->ignore($this->route('club')->id)],
			'slug' => ['string', Rule::unique('clubs')->ignore($this->route('club')->id)],
			'approved' => ['boolean'],
			'logo' =>  ['image'],
		];
	}

	private function strBoolToBoolean($str) {
		if ($str === 'true') {
			return true;
		}
	}
	protected function prepareForValidation() {
		$this->merge([
			'slug' => Str::slug($this->name, ""),
			'approved' => filter_var($this->approved, FILTER_VALIDATE_BOOL)
		]);
	}
}
