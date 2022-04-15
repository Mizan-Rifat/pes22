<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClubResource;
use App\Models\Club;
use Illuminate\Http\Request;

class ClubController extends Controller {
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index() {
		return ClubResource::collection(Club::all());
	}
	public function store(Request $request) {
		//
	}
	public function show(Club $club) {
		return new ClubResource($club);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Models\Club  $club
	 * @return \Illuminate\Http\Response
	 */
	public function edit(Club $club) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Models\Club  $club
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, Club $club) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Models\Club  $club
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Club $club) {
		//
	}
}
