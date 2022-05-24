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
        Schema::connection('pos_sales')->create('sale_items', function (Blueprint $table) {
            $table->id();
            $table->integer('quantity');
            $table->double('value_discont')->nullable();
            $table->double('value_unitary');
            $table->double('value_total');
            $table->timestamps();
            //FK
            $table->foreignId('sale_id')->constrained()->onDelete('CASCADE');
            //FK DATABASE
            $table->unsignedBigInteger('store_id');
            $table->foreign('store_id')->references('id')->on('pos_system.stores');
            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')->references('id')->on('pos_products.products');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('pos_sales')->dropIfExists('sale_items');
    }
};
