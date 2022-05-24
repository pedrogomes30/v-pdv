<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonSector extends Model
{
    use HasFactory;

    public function sectors()
    {
        return $this->belongsTo(Sector::class);
    }

    public function person()
    {
        return $this->belongsTo(Person::class);
    }
}
