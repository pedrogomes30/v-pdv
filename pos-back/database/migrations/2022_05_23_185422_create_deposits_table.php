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
        Schema::connection('pos_products')->create('deposits', function (Blueprint $table) {
            $table->id();
            $table->string('name',30);
            //FK DATABASE
            $table->unsignedBigInteger('store_id');
            $table->foreign('store_id')->references('id')->on('pos_system.stores')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('pos_products')->dropIfExists('deposits');
    }
};
