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
        Schema::connection('pos_products')->create('product_storages', function (Blueprint $table) {
            $table->id();
            $table->Integer('quantity');
            $table->Integer('min_storage')->nullable();
            $table->Integer('max_storage')->nullable();
            $table->timestamps();
            //FK
            $table->foreignId('deposit_id')->contrained()->onDelete('CASCADE');
            $table->foreignId('product_id')->contrained()->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('pos_products')->dropIfExists('product_storages');
    }
};
