<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FixtureResource extends JsonResource {
	/**
	 * Transform the resource into an array.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
	 */
	public function toArray($request) {
		return [
			'id' => $this->id,
			'team1_id' => $this->team1_id,
			'team1' => new ClubResource($this->whenLoaded('team1')),
			'team2_id' => $this->team2_id,
			'team2' => new ClubResource($this->whenLoaded('team2')),
			'date' => $this->date,
			'tournament_id' => $this->tournament_id,
			'tournament' => new TournamentResource($this->whenLoaded('tournament')),
			'group' => $this->group_,
			'round' => $this->round,
			'leg' => $this->leg,
			'team1_goals' => $this->team1_goals,
			'team2_goals' => $this->team2_goals,
			'winner_team_id' => $this->winner_team_id,
		];
	}
}
