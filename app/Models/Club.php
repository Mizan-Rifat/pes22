<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Club extends Model {
	use HasFactory;

	protected $guarded = [];

	public function owner() {
		return $this->belongsTo(User::class, 'owner_id', 'id');
	}

	public function tournaments() {
		return $this->belongsToMany(Tournament::class);
	}
}
