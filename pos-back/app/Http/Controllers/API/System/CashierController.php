<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCashierRequest;
use App\Http\Requests\UpdateCashierRequest;
use App\Models\Cashier;

class CashierController extends Controller
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
     * @param  \App\Http\Requests\StoreCashierRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCashierRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cashier  $cashier
     * @return \Illuminate\Http\Response
     */
    public function show(Cashier $cashier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cashier  $cashier
     * @return \Illuminate\Http\Response
     */
    public function edit(Cashier $cashier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCashierRequest  $request
     * @param  \App\Models\Cashier  $cashier
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCashierRequest $request, Cashier $cashier)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cashier  $cashier
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cashier $cashier)
    {
        //
    }
}
