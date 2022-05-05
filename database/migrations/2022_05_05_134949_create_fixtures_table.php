<?php

use App\Models\Club;
use App\Models\Tournament;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('fixtures', function (Blueprint $table) {
			$table->id();
			$table->foreignId('team1_id')->constrained('clubs');
			$table->foreignId('team2_id')->constrained('clubs');
			$table->dateTime('date')->nullable();
			$table->foreignIdFor(Tournament::class);
			$table->unsignedInteger('group_')->nullable();
			$table->unsignedInteger('round')->nullable();
			$table->unsignedInteger('leg')->nullable();
			$table->unsignedInteger('team1_goals')->default(0);
			$table->unsignedInteger('team2_goals')->default(0);
			$table->unsignedInteger('winner_team_id')->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('fixtures');
	}
};
