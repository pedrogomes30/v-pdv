<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    public function storeGroup()
    {
        return $this->belongsTo(StoreGroup::class);
    }

    public function persons()
    {
        return $this->haveMany(Person::class);
    }

    public function cashiers()
    {
        return $this->hasMany(Cashier::class);
    }
    
}
