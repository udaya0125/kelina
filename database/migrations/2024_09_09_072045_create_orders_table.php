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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('user_id'); // Foreign key for user
            $table->string('name'); // Name field
            $table->string('phone'); // Phone field
            $table->string('email')->unique(); // Unique email field
            $table->string('address'); // Address field
            $table->string('zipcode'); // Zipcode field
            $table->string('city'); // City field
            $table->string('order_id'); // Order ID field
            $table->string('payment_method'); // Payment method field
            $table->text('instruction')->nullable(); // Nullable instruction field
            $table->text('contact_info')->nullable(); // Nullable contact info field
            $table->string('status')->default('Pending'); // Status field with default value
            $table->decimal('discount_amount', 10, 2)->nullable(); // Nullable discount amount
            $table->string('coupon_code')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
