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
        Schema::connection('pos_sales')->create('sale_payments', function (Blueprint $table) {
            $table->id();
            $table->double('value');
            $table->timestamps();
            //FK
            $table->foreignId('sale_id')->constrained()->onDelete('CASCADE');
            $table->foreignId('payment_method_id')->constrained();
            //FK DATABASE
            $table->unsignedBigInteger('store_id');
            $table->foreign('store_id')->references('id')->on('pos_system.stores');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('pos_sales')->dropIfExists('sale_payments');
    }
};
