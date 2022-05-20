<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreuserModuleRequest;
use App\Http\Requests\UpdateuserModuleRequest;
use App\Models\userModule;

class UserModuleController extends Controller
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
     * @param  \App\Http\Requests\StoreuserModuleRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreuserModuleRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\userModule  $userModule
     * @return \Illuminate\Http\Response
     */
    public function show(userModule $userModule)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\userModule  $userModule
     * @return \Illuminate\Http\Response
     */
    public function edit(userModule $userModule)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateuserModuleRequest  $request
     * @param  \App\Models\userModule  $userModule
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateuserModuleRequest $request, userModule $userModule)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\userModule  $userModule
     * @return \Illuminate\Http\Response
     */
    public function destroy(userModule $userModule)
    {
        //
    }
}
