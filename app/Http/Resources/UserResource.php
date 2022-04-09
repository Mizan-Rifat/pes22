<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class UserResource extends JsonResource {
	/**
	 * Transform the resource collection into an array.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
	 */
	public function toArray($request) {
		return [
			'id' => $this->id,
			'name' => $this->name,
			'email' => $this->email,
			$this->mergeWhen(true, [
				'roles' =>  RoleResource::collection($this->roles),
				'permissions' => PermissionResource::collection($this->getAllPermissions())
			]),
		];
	}
}
