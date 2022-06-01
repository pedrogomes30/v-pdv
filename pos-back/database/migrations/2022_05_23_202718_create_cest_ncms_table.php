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
        Schema::connection('pos_products')->create('cest_ncms', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            //FK
            $table->foreignId('ncm')->constrained()->onDelete('CASCADE');
            $table->foreignId('cest')->constrained()->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('pos_products')->dropIfExists('cest_ncms');
    }
};
