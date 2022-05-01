<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tournament extends Model {
	use HasFactory;
	protected $guarded = [];

	public function clubs() {
		return $this->belongsToMany(Club::class);
	}
}
