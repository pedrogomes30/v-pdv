<?php

namespace App\Services\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Exception;

class LoginService 
{
    public function execute(array $credentials):array
    {
         if(!$token = auth()->setTTL(6*60)->attempt($credentials)){
             throw new Exception('Not authorized',401);
         }
         return [
             'access_token'=>$token,
             'token_type'=>'Bearer',
             'expires_in'=>auth()->factory()->getTTL(),
             'user'=>[
                 'name'=>auth()->user()->name,
                 'email'=>auth()->user()->email,
                 'user_type'=>\App\Models\UserType::findOrFail(auth()->user()->user_type_id)->name,
                ]
            ];
    }
    public function authorize()
    {
        return true;
    }
}
