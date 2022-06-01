<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use App\Services\Auth\LoginService;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    private $loginService;

    public function __construct(LoginService $loginService)
    {
        $this->loginService = $loginService;
 
    }
    public function login(Request $request)
    {
        try{
            $credentials = $request->only('email','password');
            $auth = $this->loginService->execute($credentials);
            return response()->json(['error'=>true,'message'=>'','data'=>$auth],200);
        }catch(\Exception $e){
            return response()->json(
                [
                    'error'=>true,'message'=>$e->getMessage()
                ],500);
        }
    }
    public function me()
    {
        try{
            return response()->json(auth()->user(),200);
        }catch(\Exception $e){
            return response()->json(
                [
                    'error'=>true,'message'=>$e->getMessage()
                ],500
            );
        }
    }
    public function logout()
    {
        try{
            auth()->logout(true);
        }catch(\Exception $e){
            return response()->json(
                [
                    'error'=>true,'message'=>$e->getMessage()
                ],500
            );
        }
    }
}
