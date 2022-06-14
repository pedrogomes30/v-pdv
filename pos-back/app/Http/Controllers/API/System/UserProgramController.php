<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserProgramRequest;
use App\Http\Requests\UpdateUserProgramRequest;
use App\Models\UserProgram;

class UserProgramController extends Controller
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
     * @param  \App\Http\Requests\StoreUserProgramRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserProgramRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UserProgram  $userProgram
     * @return \Illuminate\Http\Response
     */
    public function show(UserProgram $userProgram)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\UserProgram  $userProgram
     * @return \Illuminate\Http\Response
     */
    public function edit(UserProgram $userProgram)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUserProgramRequest  $request
     * @param  \App\Models\UserProgram  $userProgram
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserProgramRequest $request, UserProgram $userProgram)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserProgram  $userProgram
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserProgram $userProgram)
    {
        //
    }
}
