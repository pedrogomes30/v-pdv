<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    protected $connection = 'pos_products';
    protected $fillable = [
        'sell_price',
        'cost_price',
        'price_list_id',
        'product_id',
    ];
    use HasFactory;
}
