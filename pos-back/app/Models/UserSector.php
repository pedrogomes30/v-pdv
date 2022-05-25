<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSector extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'sector_id',
        'user_id',
    ];

    public function sectors()
    {
        return $this->belongsTo(Sector::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
