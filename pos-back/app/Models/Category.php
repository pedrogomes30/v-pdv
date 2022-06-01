<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $connection = 'pos_products';
    protected $fillable = [
        'name',
        'website',
        'cest_ncm_id',
    ];
    use HasFactory;

    
}
