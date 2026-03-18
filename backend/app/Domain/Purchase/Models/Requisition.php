<?php

namespace Domain\Purchase\Models;

use Domain\Inventory\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class Requisition extends Model
{
    protected $table = 'purchase_requisitions';

    protected $fillable = [
        'supplier_id', 'product_id', 'qty', 'total_price'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope('select_custom', function (Builder $query) {
            $query->select([
                'id', 'supplier_id', 'product_id', 'qty', 'total_price', 'created_at', 'updated_at'
            ]);
        });
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class, 'supplier_id', 'id');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
