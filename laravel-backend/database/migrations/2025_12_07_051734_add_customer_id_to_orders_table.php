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
        Schema::table('orders', function (Blueprint $table) {
            // Drop old redundant fields
            $table->dropColumn(['customer_name', 'customer_email']);

            // Add relational foreign key to customers table
            $table->foreignId('customer_id')
                  ->constrained('customers')
                  ->onDelete('cascade');
            
            // Add status column if not already present
            if (!Schema::hasColumn('orders', 'status')) {
                $table->string('status')->default('pending');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Rollback: remove customer_id and status
            $table->dropForeign(['customer_id']);
            $table->dropColumn('customer_id');
            $table->dropColumn('status');

            // Restore old fields
            $table->string('customer_name');
            $table->string('customer_email');
        });
    }
};
