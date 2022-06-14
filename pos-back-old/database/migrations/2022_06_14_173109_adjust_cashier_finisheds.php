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
        Schema::connection('pos_withdrawal_closure')->create('adjust_cashier_finisheds', function (Blueprint $table) {
            $table->id();
            $table->string('justify');    
            $table->double('value');            
            //FK
            $table->foreignId('cashier_finish_payments_id')->constrained()->onDelete('CASCADE');
            $table->foreignId('cashier_finished_id')->constrained()->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('pos_withdrawal_closure')->dropIfExists('adjust_cashier_finisheds');
    }
};
