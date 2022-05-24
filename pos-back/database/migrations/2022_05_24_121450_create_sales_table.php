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
        Schema::connection('pos_sales')->create('sales', function (Blueprint $table) {
            $table->id();
            $table->string('number')->unique();
            $table->double('value_payments');
            $table->double('value_products');
            $table->double('value_disconts')->nullable();
            $table->double('total_sale');
            $table->enum('status',['finished','complete','error','deny','canceled'])->default('finished');
            $table->string('obs')->nullable();
            $table->timestamps();
            //always save a sale before issue invoice, all invoice field needs to be nullable.
            $table->boolean('invoiced')->default(false);
            $table->boolean('invoice_ambient')->default(false); //true->production false->homologation
            $table->integer('invoice_number')->nullable();
            $table->integer('invoice_serie')->nullable();
            $table->text('invoice_coupon')->nullable();
            $table->string('hashcode')->nullable(); //for nom duplicate sales
            //FK
            $table->foreignId('payment_method')->constrained();
            //FK DATABASE
            $table->unsignedBigInteger('store_id');
            $table->foreign('store_id')->references('id')->on('pos_system.stores');
            $table->unsignedBigInteger('employee_cashier_id');
            $table->foreign('employee_cashier_id')->references('id')->on('pos_system.people');
            $table->unsignedBigInteger('client_id');
            $table->foreign('client_id')->references('id')->on('pos_system.people');
            $table->unsignedBigInteger('salesman_id');
            $table->foreign('salesman_id')->references('id')->on('pos_system.people');
            $table->unsignedBigInteger('cashier_id');
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
        Schema::connection('pos_sales')->dropIfExists('sales');
    }
};
