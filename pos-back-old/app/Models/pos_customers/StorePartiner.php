<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class store_partiner extends Model
{
    protected $connection = 'pos_customers';
    use HasFactory;
}