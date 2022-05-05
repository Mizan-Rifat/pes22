<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fixture extends Model {
	use HasFactory;

	public function team1() {
		return $this->hasOne(Club::class, 'id', 'team1_id');
	}
	public function team2() {
		return $this->hasOne(Club::class, 'id', 'team2_id');
	}
	public function tournament() {
		return $this->belongsTo(Tournament::class);
	}
}
