<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWithdrawalAccountRequest;
use App\Http\Requests\UpdateWithdrawalAccountRequest;
use App\Models\pos_withdrawal_closure\WithdrawalAccount;

class WithdrawalAccountController extends Controller
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
     * @param  \App\Http\Requests\StoreWithdrawalAccountRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreWithdrawalAccountRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\pos_withdrawal_closure\WithdrawalAccount  $withdrawalAccount
     * @return \Illuminate\Http\Response
     */
    public function show(WithdrawalAccount $withdrawalAccount)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\pos_withdrawal_closure\WithdrawalAccount  $withdrawalAccount
     * @return \Illuminate\Http\Response
     */
    public function edit(WithdrawalAccount $withdrawalAccount)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateWithdrawalAccountRequest  $request
     * @param  \App\Models\pos_withdrawal_closure\WithdrawalAccount  $withdrawalAccount
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateWithdrawalAccountRequest $request, WithdrawalAccount $withdrawalAccount)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\pos_withdrawal_closure\WithdrawalAccount  $withdrawalAccount
     * @return \Illuminate\Http\Response
     */
    public function destroy(WithdrawalAccount $withdrawalAccount)
    {
        //
    }
}
