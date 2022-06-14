<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use \App\Http\Controllers\Controller;

class StoreGroupController extends Controller
{
    public function index()
    {
        try{
            return \App\Models\StoreGroup::with('stores')->get();
        }catch(\Exception $e){
            return response()->json();
        }
    }   
}
