<?php

namespace App\Http\Controllers\API\v1;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Store;
use \App\Models\StoreGroup;
use \App\Models\Cashier;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function index(){
        try{
            return response()->json(['error'=>false,'message'=>'','data'=>Store::all()],200);
        }catch(\Exception $e){
            return response()->json(['error'=>false,'message'=>$e->getMessage(),'data'=>''],500);
        }
    }

    public function show ($id){
        try{
            return response()->json(['error'=>false,'message'=>'','data'=>Store::findOrFail($id)],200);
        }catch(\Exception $e){
            return response()->json(['error'=>false,'message'=>$e->getMessage(),'data'=>''],500);
        }
    }
    public function store(Request $request){
        try{
            DB::beginTransaction('pos_system');
            $request->validate([
                'social_name',
                'fantasy_name',
                'abbreviation',
                'cnpj',
                'obs',
                'state_inscription',
                'municipal_inscription',
                'icms',
                'tax_regime',
                'invoice_type',
                'invoice_provider_id',
                'production_csc_number',
                'production_csc_id',
                'production_invoice_serie',
                'production_invoice_sequence',
                'homologation_csc_number',
                'homologation_csc_id',
                'homologation_invoice_serie',
                'homologation_invoice_sequence',
                'certificate_password',
                'store_group_id',
            ]);
            $return = Store::create($request->all());
            DB::commit();
            return response()->json(['error'=>false,'message'=>'','data'=>$return],200);
        }catch(\exception $e){
            DB::rollback();
            return response()->json(['error'=>false,'message'=>$e->getMessage(),'data'=>''],500);
        }
    }
    public function update($id){
        try{
            
        }catch(\Exception $e){

        }
    }

}
