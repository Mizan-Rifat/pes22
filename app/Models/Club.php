<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Club extends Model {
	use HasFactory;

	protected $guarded = [];

	public function owner() {
		return $this->belongsTo(User::class, 'owner_id', 'id',);
	}

	public function tournaments() {
		return $this->belongsToMany(Tournament::class);
	}

	public function fixtures() {
		return $this->hasMany(Fixture::class, 'team1_id', 'id')->orWhere('team2_id', '=', $this->id);
	}
}
