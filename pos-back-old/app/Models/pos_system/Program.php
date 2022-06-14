<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    protected $fillable = [
        'name',
        'controller',
        'sector_id',
    ];
    use HasFactory;
    public function sector()
    {
        return $this->belongsTo(Sector::class);
    }
}
