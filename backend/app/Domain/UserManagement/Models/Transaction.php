<?php

namespace Domain\UserManagement\Models;

use Domain\Inventory\Models\Product;
use Domain\UserManagement\Scopes\MustSameUser;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class Transaction extends Model
{
    protected $table = 'users_transactions';

    protected $fillable = [
        'user_id', 'products', 'order_id', 'total_price', 'midtrans_data', 'status'
    ];

    protected $casts = [
        'products' => 'array',
        'midtrans_data' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope(new MustSameUser);
        static::addGlobalScope('select_custom', function (Builder $query) {
            $query->select([
                'id', 'user_id', 'products', 'order_id', 'total_price', 'status', 'midtrans_data', 'created_at', 'updated_at'
            ]);
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
