<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StoreGroupController extends Controller
{
    public function index()
    {
        return \App\Models\StoreGroup::with('stores')->get();
    }
}
