<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleItem extends Model
{
    protected $connection = 'pos_sales';
    protected $fillable = [
        'quantity',
        'value_discont',
        'value_unitary',
        'value_total',
        'sale_id',
        'store_id',
        'product_id',
    ];
    use HasFactory;
}
