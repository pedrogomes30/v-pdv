<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalePayment extends Model

{
    protected $connection = 'pos_sales';
    protected $fillable = [
        'value',
        'sale_id',
        'payment_method_id',
        'store_id',
    ];
    use HasFactory;
}
