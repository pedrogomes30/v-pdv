<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonProgram extends Model
{
    use HasFactory;

    public function programs()
    {
        return $this->belongsTo(Program::class);
    }

    public function person()
    {
        return $this->belongsTo(Person::class);
    }
}
