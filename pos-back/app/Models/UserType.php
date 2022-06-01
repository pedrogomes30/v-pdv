<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserType extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'name',
        'is_employee',
    ];
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
