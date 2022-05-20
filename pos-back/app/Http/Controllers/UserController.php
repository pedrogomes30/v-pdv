<?php

namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show($id){
        var_dump($id);
        $user = User::where('id','$id')->first();
        dd($user);
    }
}
