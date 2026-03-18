<?php

namespace Domain\UserManagement\Models;

use Domain\Inventory\Models\Product;
use Domain\UserManagement\Scopes\MustSameUser;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class Cart extends Model
{
    protected $table = 'users_carts';

    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
        'total_price',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope(new MustSameUser);
        static::addGlobalScope('select_custom', function (Builder $query) {
            $query->select([
                'id', 'user_id', 'product_id', 'quantity', 'total_price', 'created_at', 'updated_at'
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
