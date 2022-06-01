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
        Schema::connection('pos_products')->create('products', function (Blueprint $table) {
            $table->id();
            $table->string('description',60);
            $table->string('description_variation',50)->nullable();
            $table->string('reference',30)->nullable();
            $table->string('sku',13);
            $table->string('barcode',13)->nullable();
            $table->Integer('family_id')->nullable();
            $table->string('obs',60)->nullable();
            $table->enum('unity',['UN','KG','KIT'])->default('UN');
            $table->string('website',100)->nullable();
            $table->string('origin',10);
            $table->string('tribute_situation',10);
            $table->boolean('is_variation')->default(false);
            $table->enum('type',['NEW','OLD_REGISTER','DETAILED'])->default('NEW');
            $table->enum('status',['ENABLE','ERROR','DISABLE'])->default('ENABLE');
            $table->string('cest',15);
            $table->string('ncm',15);
            $table->timestamps();
            //FK
            $table->foreignId('cest_ncm_id')->constrained();
            $table->foreignId('provider_id')->constrained()->nullable();
            $table->foreignId('brand_id')->constrained()->nullable();
            $table->foreignId('category_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */

    public function down()
    {
        Schema::connection('pos_products')->dropIfExists('products');
    }
};
