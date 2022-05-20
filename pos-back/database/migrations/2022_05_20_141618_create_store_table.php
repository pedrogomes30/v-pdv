<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('store', function (Blueprint $table) {
            $table->id();
            $table->string('corporate_name');
            $table->char('abreviacao',5)->unique();
            $table->string('fantasy_name');
            $table->string('cnpj',20);
            $table->foreignId('store_group_id')->constreined();
            $table->string('municipal_register',20);
            $table->string('state_register',20);
            $table->string('icms',20);
            $table->string('tax_regime');
            $table->enum('emisson_flow',['normal','complete','none']);
            $table->char('production_csc_id',10);
            $table->string('production_csc_code');
            $table->string('production_serie_nf');
            $table->string('production_sequence _nf');
            $table->char('homologation_csc_id',10);
            $table->string('homologation_csc_code');
            $table->string('homologation_serie_nf');
            $table->string('homologation_sequence _nf');
            $table->string('enotas_id');
            $table->string('certificate_password');
            


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('store');
    }
};
