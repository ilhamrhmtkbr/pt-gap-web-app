<?php

namespace Domain\Purchase\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class Supplier extends Model
{
    protected $table = 'purchase_suppliers';

    protected $fillable = [
        'name', 'address'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope('select_custom', function (Builder $builder) {
            $builder->select([
                'id', 'name', 'address', 'created_at', 'updated_at'
            ]);
        });
    }

    public function requisitions(): HasMany
    {
        return $this->hasMany(Requisition::class, 'supplier_id', 'id');
    }
}
