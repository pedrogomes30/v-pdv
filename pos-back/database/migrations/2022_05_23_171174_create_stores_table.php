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
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->string('social_name',60)->unique();
            $table->string('fantasy_name',60)->unique();
            $table->char('abbreviation',5)->unique();
            $table->string('cnpj',16)->unique();
            $table->string('obs',60)->nullable();
            $table->string('state_inscription',20)->unique()->nullable();
            $table->string('municipal_inscription',20)->unique()->nullable();
            $table->string('icms',20)->nullable();
            $table->string('tax_regime',20)->nullable();
            $table->integer('invoice_type')->default(1);
            $table->string('invoice_provider_id',30)->nullable();
            $table->string('production_csc_number',30)->nullable();
            $table->string('production_csc_id',10)->nullable();
            $table->string('production_invoice_serie',10)->nullable();
            $table->string('production_invoice_sequence',30)->nullable();
            $table->string('homologation_csc_number',30)->nullable();
            $table->string('homologation_csc_id',10)->nullable();
            $table->string('homologation_invoice_serie',10)->nullable();
            $table->string('homologation_invoice_sequence',30)->nullable();
            $table->string('certificate_password',20)->nullable();
            $table->timestamps();
            //FK
            $table->foreignId('store_group_id')->constrained()->onDelete('CASCADE');             
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stores');
    }
};
