<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cashier extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'cashier_type',
        'user_id',
        'store_id',
    ];
    public function store()
    {
        return $this->belongsTo(Store::class);
    }

}
