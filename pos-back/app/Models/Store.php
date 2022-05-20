<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    public function users(){
        return $this->hasMany('App\models\User');
    }
    public function storeGroup(){
        return $this->belongsTo('App\models\StoreGroup');
    }
}
