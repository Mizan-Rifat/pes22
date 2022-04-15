<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClubResource extends JsonResource {

	public function toArray($request) {
		return [
			'id' => $this->id,
			'name' => $this->name,
			'slug' => $this->slug,
			'logo' => asset('/images/club_logo/' . $this->logo),
			'establishedIn' => $this->created_at,
			'owner' => new UserResource($this->whenLoaded('owner')),
			'approved' => (bool) $this->approved,
		];
	}
}
