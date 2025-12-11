<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'customer_id',
        'product_id',
        'quantity',
        'total_price',
        'status',
        'name',
        'address',
        'payment',
    ];

    public function product() {
        return $this->belongsTo(Product::class);
    }

    // ✅ Rename to "user" since customer_id now points to users.id
    public function user() {
        return $this->belongsTo(User::class, 'customer_id');
    }
}
