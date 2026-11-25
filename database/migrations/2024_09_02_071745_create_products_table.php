<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('product_category');
            $table->string('sku'); 
            $table->string('product_type'); 
            $table->string('product_brand'); 
            $table->decimal('discounted_price',10,2)->nullable();
            $table->decimal('buying_price',10,2)->nullable(); 
            $table->decimal('selling_price',10,2); 
            $table->integer('stock_quantity')->default(0); 
            $table->longText('description')->nullable(); 
            $table->longText('specification')->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
