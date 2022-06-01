<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CestNcm extends Model
{
    protected $connection = 'pos_products';
    protected $fillable = [
        'ncm',
        'cest',
    ];
    use HasFactory;
}
