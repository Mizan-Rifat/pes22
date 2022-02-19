<?php

use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RolePermission;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::resource('permissions', PermissionController::class, ['except' => ['create', 'edit']]);
Route::resource('roles', RoleController::class, ['except' => ['create', 'edit']]);
Route::resource('users', UserController::class, ['except' => ['create', 'edit']]);


Route::get('user/{user}/permission', [RolePermission::class, 'getAllPermissionsOfUser']);
Route::post('user/permission', [RolePermission::class, 'givePermissionToUser']);
Route::delete('user/{user}/permission/{permission}', [RolePermission::class, 'revokePermissionFromUser']);

Route::get('user/{user}/role', [RolePermission::class, 'getAllRolesOfUser']);
Route::post('user/role', [RolePermission::class, 'assignRoleToUser']);
Route::delete('user/{user}/role/{role}', [RolePermission::class, 'removeRoleFromUser']);

Route::get('role/{role}/permission', [RolePermission::class, 'getAllPermissionsOfRole']);
Route::post('role/permission', [RolePermission::class, 'givePermissionToRole']);
Route::delete('role/{role}/permission/{permission}', [RolePermission::class, 'revokePermissionFromRole']);
