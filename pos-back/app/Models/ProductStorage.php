<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductStorage extends Model
{
    protected $connection = 'pos_products';
    protected $fillable = [
        'quantity',
        'min_storage',
        'max_storage',
        'deposit_id',
        'product_id',
    ];
    use HasFactory;
}
