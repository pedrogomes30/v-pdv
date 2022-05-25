<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;
    protected $fillable = [
        'social_name',
        'fantasy_name',
        'abbreviation',
        'cnpj',
        'obs',
        'state_inscription',
        'municipal_inscription',
        'icms',
        'tax_regime',
        'invoice_type',
        'invoice_provider_id',
        'production_csc_number',
        'production_csc_id',
        'production_invoice_serie',
        'production_invoice_sequence',
        'homologation_csc_number',
        'homologation_csc_id',
        'homologation_invoice_serie',
        'homologation_invoice_sequence',
        'certificate_password',
        'store_group_id',
    ];
    public function storeGroup()
    {
        return $this->belongsTo(StoreGroup::class);
    }

    public function users()
    {
        return $this->haveMany(User::class);
    }

    public function cashiers()
    {
        return $this->hasMany(Cashier::class);
    }
    
}
