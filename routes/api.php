<?php

use App\Http\Controllers\ClubController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PlayerModelController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\TournamentController;
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
	return Club::with('fixtures')->get();
});

Route::resource('permissions', PermissionController::class, ['except' => ['create', 'edit']]);
Route::resource('roles', RoleController::class, ['except' => ['create', 'edit']]);
Route::resource('users', UserController::class, ['except' => ['create', 'edit']]);
Route::resource('clubs', ClubController::class, ['except' => ['create', 'edit', 'update', 'store']]);
Route::post('clubs/{club}', [ClubController::class, 'update']);
Route::resource('tournaments', TournamentController::class, ['except' => ['create', 'edit']]);
Route::post('tournaments/{tournament}/updateclubs', [TournamentController::class, 'updateClubs']);
Route::resource('player-models', PlayerModelController::class, ['except' => ['create', 'edit']]);
Route::post('player-models/{playerModel}', [PlayerModelController::class, 'updateAvatar']);


Route::get('user/{user}/permission', [RolePermissionController::class, 'getAllPermissionsOfUser']);
Route::post('user/permission', [RolePermissionController::class, 'givePermissionToUser']);
Route::delete('user/{user}/permission/{permission}', [RolePermissionController::class, 'revokePermissionFromUser']);

Route::get('user/{user}/role', [RolePermissionController::class, 'getAllRolesOfUser']);
Route::post('user/role', [RolePermissionController::class, 'assignRoleToUser']);
Route::delete('user/{user}/role/{role}', [RolePermissionController::class, 'removeRoleFromUser']);

Route::get('role/{role}/permission', [RolePermissionController::class, 'getAllPermissionsOfRole']);
Route::post('role/permission', [RolePermissionController::class, 'givePermissionToRole']);
Route::delete('role/{role}/permission/{permission}', [RolePermissionController::class, 'revokePermissionFromRole']);
