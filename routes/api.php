<?php

use App\Http\Controllers\ClubController;
use App\Http\Controllers\FixtureController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PlayerModelController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\TournamentController;
use App\Http\Controllers\TournamentFixtureController;
use App\Http\Controllers\UserController;
use App\Models\Club;
use App\Models\Fixture;
use App\Models\PlayerModel;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
	return $request->user();
});

Route::get('/test', function () {
	// return Club::with('fixtures')->get();
	return Club::with('fixtures')->where('id', 1)->get();
	return Club::find(1)->fixtures;
});

Route::apiResource('permissions', PermissionController::class);
Route::apiResource('roles', RoleController::class);
Route::apiResource('users', UserController::class);

Route::apiResource('clubs', ClubController::class);
Route::post('clubs/{club}', [ClubController::class, 'update']);
Route::get('clubs/{club}/fixtures', [ClubController::class, 'index']);

Route::apiResource('tournaments', TournamentController::class);
Route::post('tournaments/{tournament}/updateclubs', [TournamentController::class, 'updateClubs'])->name('tournaments.update.clubs');
Route::get('tournaments/{tournament}/fixtures', [TournamentFixtureController::class, 'show'])->name('tournaments.fixtures');

Route::apiResource('player-models', PlayerModelController::class);
Route::post('player-models/{playerModel}', [PlayerModelController::class, 'updateAvatar']);

Route::apiResource('fixtures', FixtureController::class);


Route::get('user/{user}/permission', [RolePermissionController::class, 'getAllPermissionsOfUser']);
Route::post('user/permission', [RolePermissionController::class, 'givePermissionToUser']);
Route::delete('user/{user}/permission/{permission}', [RolePermissionController::class, 'revokePermissionFromUser']);

Route::get('user/{user}/role', [RolePermissionController::class, 'getAllRolesOfUser']);
Route::post('user/role', [RolePermissionController::class, 'assignRoleToUser']);
Route::delete('user/{user}/role/{role}', [RolePermissionController::class, 'removeRoleFromUser']);

Route::get('role/{role}/permission', [RolePermissionController::class, 'getAllPermissionsOfRole']);
Route::post('role/permission', [RolePermissionController::class, 'givePermissionToRole']);
Route::delete('role/{role}/permission/{permission}', [RolePermissionController::class, 'revokePermissionFromRole']);
