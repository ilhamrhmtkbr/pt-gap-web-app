<?php

namespace Domain\Sales\Models;

use Domain\Inventory\Models\Product;
use Domain\UserManagement\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class Sale extends Model
{
    protected $table = 'sale_sales';

    protected $fillable = [
        'user_id', 'product_id', 'quantity', 'total_price'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope('select_custom', function (Builder $builder) {
            $builder->addSelect([  // ✅ ganti select → addSelect
                'id', 'user_id', 'product_id', 'quantity', 'total_price', 'created_at', 'updated_at'
            ]);
        });
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
