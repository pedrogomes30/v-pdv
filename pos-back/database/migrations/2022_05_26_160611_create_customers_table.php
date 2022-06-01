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
        Schema::connection('pos_customers')->create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name',100);
            $table->string('document',100)->unique();
            $table->boolean('document_type')->default(true); //true -> cpf, false-> cnpj
            $table->string('email',60)->unique();
            $table->string('phone_1',30)->nullable();
            $table->string('phone_2',30)->nullable();
            $table->string('phone_3',30)->nullable();
            $table->timestamps();
            //FK
            $table->foreignId('store_partiner_id')->nullable()->constrained();
            //FK DATABASE
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('pos_system.users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('pos_customers')->dropIfExists('customers');
    }
};
