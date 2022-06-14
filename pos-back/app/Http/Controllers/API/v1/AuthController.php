<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use App\Services\Auth\LoginService;
use App\Http\Controllers\Controller;
use App\Models\Store;
use \App\Models\StoreGroup;
use \App\Models\Cashier;

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
            return response()->json(['error'=>false,'message'=>'','data'=>$auth],200);
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
            return response()->json(['error'=>false,'message'=>$e->getMessage(),'data'=>auth()->user(),'test'=>auth()],200);
        }catch(\Exception $e){
            return response()->json(
                [
                    'error'=>true,'message'=>$e->getMessage()
                ],500
            );
        }
    }
    public function meStore()
    {
        try{
            $store                  = Store::findOrFail(auth()->user()->store_id);
            $storeGroup             = StoreGroup::findOrFail($store->store_group_id);
            $return                 = array();
            $cashiers               = Cashier::where('store_id',$store->id)->get();
            $return['id']           = $store->id;
            $return['name']         = $store->fantasy_name;
            $return['abbreviation'] = $store->abbreviation;
            $return['store_group_id']= $storeGroup->id;
            $return['store_group_name']= $storeGroup->name;
            $return['cashiers']     = $cashiers;
            return response()->json(['error'=>false,'message'=>'','data'=>$return],200);
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
