<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $connection = 'pos_sales';
    protected $fillable = [
        'number',
        'value_payments',
        'value_products',
        'value_disconts',
        'total_sale',
        'status',
        'obs',
        'invoiced',
        'invoice_ambient',
        'invoice_number',
        'invoice_serie',
        'invoice_coupon',
        'hashcode',
        'payment_method',
        'store_id',
        'employee_cashier_id',
        'client_id',
        'salesman_id',
        'cashier_id',
    ];
    use HasFactory;
}
