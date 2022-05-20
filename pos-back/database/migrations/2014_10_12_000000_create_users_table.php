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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('login')->unique();
            $table->string('document')->unique();
            $table->string('password');
            $table->boolean('active');
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->foreignId('store_id')->constreined();
            //grupo empresarial
            //loja
            //modulos
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(){
        $table->foreingnId('store_id')->constrained()->onDelete('cascade');
        Schema::dropIfExists('users');
    }
};
