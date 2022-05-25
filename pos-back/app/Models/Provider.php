<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Provider extends Model
{
    protected $connection = 'pos_products';
    protected $fillable =[
        'social_name',
        'fantasy_name',
        'cnpj',
    ];
    use HasFactory;
}
