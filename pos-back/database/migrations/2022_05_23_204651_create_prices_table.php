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
        Schema::connection('pos_products')->create('prices', function (Blueprint $table) {
            $table->id();
            $table->double('sell_price',10,2);
            $table->double('cost_price',10,2)->nullable();
            $table->timestamps();
            //FK
            $table->foreignId('price_list_id')->constrained()->onDelete('CASCADE');
            $table->foreignId('product_id')->constrained()->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('pos_products')->dropIfExists('prices');
    }
};
