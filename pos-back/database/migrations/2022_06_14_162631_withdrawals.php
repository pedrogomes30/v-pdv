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
        Schema::connection('pos_withdrawal_closure')->create('withdrawals', function (Blueprint $table) {
            $table->id();
            $table->date('dt_withdrawal');
            $table->double('value');            
            $table->string('obs');    
            //FK
            $table->foreignId('withdrawal_account_id')->constrained()->onDelete('CASCADE');
            $table->foreignId('cashier_finisheds_id')->constrained()->onDelete('CASCADE');
            //FK DATABASE
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('pos_system.users');
            $table->unsignedBigInteger('store_id')->nullable();
            $table->foreign('store_id')->references('id')->on('pos_system.stores');
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
        Schema::connection('pos_withdrawal_closure')->dropIfExists('withdrawals');
    }
};
