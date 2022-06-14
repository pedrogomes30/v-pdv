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
        Schema::connection('pos_customers')->create('addresses', function (Blueprint $table) {
            $table->id();
            $table->string('postalCode',20);
            $table->timestamps();
            $table->foreignId('customer_id')->constrained()->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('pos_customers')->dropIfExists('addresses');
    }
};
