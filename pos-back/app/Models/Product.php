<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $connection = 'pos_products';
    protected $fillable = [
        'description',
        'description_variation',
        'reference',
        'sku',
        'barcode',
        'family_id',
        'obs',
        'unity',
        'website',
        'origin',
        'tribute_situation',
        'is_variation',
        'type',
        'status',
        'cest',
        'ncm',
        'cest_ncm_id',
        'provider_id',
        'brand_id',
        'category_id',
    ];
    use HasFactory;
}
