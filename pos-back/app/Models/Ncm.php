<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ncm extends Model
{
    protected $connection = 'pos_products';
    protected $fillable = [
        'description',
        'number',
    ];
    use HasFactory;
}
