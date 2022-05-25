<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Store>
 */
class StoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'social_name'=>$this->faker->company(),
            'fantasy_name'=>$this->faker->company(),
            'abbreviation'=>'EXEM',
            'cnpj'=>$this->faker->numerify('000 ###########'),
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
            'certificate_password'=>'PASSWORD',
            'store_group_id'=>1,
        ]; 
    }
}
