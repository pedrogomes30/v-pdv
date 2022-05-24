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
        Schema::create('people', function (Blueprint $table) {
            $table->id();
            $table->string('name',60);
            $table->string('document',20)->unique()->nullable();
            $table->string('email',40)->unique();
            $table->string('obs',60)->nullable();
            $table->string('login',30)->unique()->nullable();
            $table->string('password',30)->nullable();
            $table->boolean('active')->default(false);
            $table->timestamps();
            //fk
            $table->foreignId('store_id')->constrained();
            $table->foreignId('person_type_id')->constrained()->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('people');
    }
};
