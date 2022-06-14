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
        Schema::connection('pos_withdrawal_closure')->create('cashier_finish_payments', function (Blueprint $table) {
            $table->id();
            $table->double('value');
            //FK
            $table->foreignId('cashier_finisheds_id')->constrained()->onDelete('CASCADE');
            //FK DATABASE
            $table->unsignedBigInteger('payment_method_id')->nullable();
            $table->foreign('payment_method_id')->references('id')->on('pos_system.payment_methods');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('pos_withdrawal_closure')->dropIfExists('cashier_finish_payments');
    }
};
