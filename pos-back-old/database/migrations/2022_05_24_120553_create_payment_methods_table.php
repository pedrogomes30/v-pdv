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
        Schema::connection('pos_sales')->create('payment_methods', function (Blueprint $table) {
            $table->id();
            $table->string('method');
            $table->boolean('phisical_payment')->default(true);
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
        Schema::connection('pos_sales')->dropIfExists('payment_methods');
    }
};
