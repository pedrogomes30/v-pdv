<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCashierLogRequest;
use App\Http\Requests\UpdateCashierLogRequest;
use App\Models\CashierLog;

class CashierLogController extends Controller
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
     * @param  \App\Http\Requests\StoreCashierLogRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCashierLogRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CashierLog  $cashierLog
     * @return \Illuminate\Http\Response
     */
    public function show(CashierLog $cashierLog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CashierLog  $cashierLog
     * @return \Illuminate\Http\Response
     */
    public function edit(CashierLog $cashierLog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCashierLogRequest  $request
     * @param  \App\Models\CashierLog  $cashierLog
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCashierLogRequest $request, CashierLog $cashierLog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CashierLog  $cashierLog
     * @return \Illuminate\Http\Response
     */
    public function destroy(CashierLog $cashierLog)
    {
        //
    }
}
