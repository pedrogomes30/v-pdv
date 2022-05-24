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
        Schema::connection('pos_products')->create('providers', function (Blueprint $table) {
            $table->id();
            $table->string('social_name',60)->unique()->nullable();
            $table->string('fantasy_name',60)->unique();
            $table->string('cnpj',16)->unique();
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
        Schema::connection('pos_products')->dropIfExists('providers');
    }
};
