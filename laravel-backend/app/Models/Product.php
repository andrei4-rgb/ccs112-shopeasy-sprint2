<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'image',
        'description',
        'stock',
        'category',   // ✅ string category field
    ];

   
    // public function category()
    // {
    //     return $this->belongsTo(Category::class);
    // }
}
