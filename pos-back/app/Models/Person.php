<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function personType()
    {
        return $this->belongsTo(PersonType::class);
    }
    
    public function programs()
    {
        return $this->hasMany(PersonProgram::class);
    }

    public function sectors()
    {
        return $this->hasMany(PersonSector::class);
    }


    

}
