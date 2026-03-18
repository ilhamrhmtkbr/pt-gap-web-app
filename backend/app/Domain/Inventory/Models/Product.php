<?php

namespace Domain\Inventory\Models;

use Domain\Purchase\Models\Requisition;
use Domain\Sales\Models\Sale;
use Domain\UserManagement\Models\Transaction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class Product extends Model
{
    protected $table = 'inventory_products';

    protected $fillable = [
        'name', 'picture', 'tag', 'price', 'stock', 'author'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope('select_custom', function (Builder $builder) {
            $builder->addSelect([
                'id', 'name', 'picture', 'tag', 'author', 'price', 'stock', 'created_at', 'updated_at'
            ]);
        });
    }

    public function sales(): HasMany
    {
        return $this->hasMany(Sale::class, 'product_id', 'id');
    }

    public function requisitions(): HasMany
    {
        return $this->hasMany(Requisition::class, 'supplier_id', 'id');
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'product_id', 'id');
    }
}
