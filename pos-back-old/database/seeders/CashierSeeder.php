<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Cashier;

class CashierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Cashier::create([
            'name'=>'SAMPLE CASHIER 1',
            'cashier_type'=>'desktop',
            'store_id'=>1
        ]);
    }
}
