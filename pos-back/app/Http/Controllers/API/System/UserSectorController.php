<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserSectorRequest;
use App\Http\Requests\UpdateUserSectorRequest;
use App\Models\UserSector;

class UserSectorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreUserSectorRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserSectorRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UserSector  $userSector
     * @return \Illuminate\Http\Response
     */
    public function show(UserSector $userSector)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\UserSector  $userSector
     * @return \Illuminate\Http\Response
     */
    public function edit(UserSector $userSector)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUserSectorRequest  $request
     * @param  \App\Models\UserSector  $userSector
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserSectorRequest $request, UserSector $userSector)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserSector  $userSector
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserSector $userSector)
    {
        //
    }
}
