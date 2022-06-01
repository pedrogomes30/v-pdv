<?php

namespace App\Services\Store;

use Illuminate\Foundation\Http\FormRequest;
use \App\Models\Cashier;
use \App\Models\Store;
use Exception;

class StoreService 
{
    public static function store(int $store_id):array
    {
        
        $store = Store::findOrFail($store_id);
        $cashiers = Cashier::where('store_id',$store_id)->get();
        dd($cashiers);
         return [
             'store_name'=>$store->fantasy_name,
             'store_abbreviation'=>$store->abbreviation,
             'cashiers'=> $cashiers
         ];
    }
}
