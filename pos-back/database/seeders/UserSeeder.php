<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name'=>'admin',
            'email'=>'admin',
            'password'=>Hash::make('admin'),
            'document'=>'00000000000000',
            'active'=>true,
            'store_id'=>2,
            'user_type_id'=>4,
        ]);
    }
}
