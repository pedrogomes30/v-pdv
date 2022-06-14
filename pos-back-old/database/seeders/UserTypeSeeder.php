<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UserType;

class UserTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UserType::create([
            'name'=>'customer',
            'is_employee'=>false,
        ]);
        UserType::create([
            'name'=>'employee',
            'is_employee'=>true,
        ]);
        UserType::create([
            'name'=>'employeePartiner',
            'is_employee'=>false,
        ]);
        UserType::create([
            'name'=>'admin',
            'is_employee'=>true,
        ]);
    }
}
