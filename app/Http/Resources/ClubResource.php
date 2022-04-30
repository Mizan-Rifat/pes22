<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClubResource extends JsonResource {

	public function toArray($request) {
		return [
			'id' => $this->id,
			'name' => $this->name,
			'slug' => $this->slug,
			'logo' => asset('/storage/images/' . $this->logo),
			'establishedIn' => $this->created_at,
			// 'owner' => new UserResource($this->whenLoaded('owner')),
			'owner' => new UserResource($this->owner),
			'approved' => (bool) $this->approved,
		];
	}
}
