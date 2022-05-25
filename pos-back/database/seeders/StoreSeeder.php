<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\Store;

class StoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Store::create([
            'social_name'=>Str::random(10).' social',
            'fantasy_name'=>Str::random(10).' fantasy',
            'abbreviation'=>Str::random(5),
            'cnpj'=>Str::random(10),
            'obs'=>'',
            'state_inscription'=>'123456',
            'municipal_inscription'=>'123456',
            'icms'=>'123456789',
            'tax_regime'=>'1',
            'invoice_type'=>'1',
            'invoice_provider_id'=>'1',
            'production_csc_number'=>'1',
            'production_csc_id'=>'1',
            'production_invoice_serie'=>'1',
            'production_invoice_sequence'=>'11',
            'homologation_csc_number'=>'1',
            'homologation_csc_id'=>'121212121',
            'homologation_invoice_serie'=>'1',
            'homologation_invoice_sequence'=>'12121',
            'certificate_password'=>Str::random(12),
            'store_group_id'=>1,
        ]);
    }
}
