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
        Schema::connection('pos_withdrawal_closure')->create('cashier_finisheds', function (Blueprint $table) {
            $table->id();
            $table->boolean('cashier_type')->default(false);
            $table->datetime('dt_open');
            $table->datetime('dt_close')->nullable();
            $table->double('value_total')->nullable();
            //FK DATABASE
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('pos_system.users');
            $table->unsignedBigInteger('stores_id')->nullable();
            $table->foreign('stores_id')->references('id')->on('pos_system.stores');
            $table->unsignedBigInteger('cashier_id')->nullable();
            $table->foreign('cashier_id')->references('id')->on('pos_system.cashiers');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('pos_withdrawal_closure')->dropIfExists('cashier_finisheds');
    }
};
