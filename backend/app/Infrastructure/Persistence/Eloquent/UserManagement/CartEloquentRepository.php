<?php

namespace Infrastructure\Persistence\Eloquent\UserManagement;

use Domain\UserManagement\Models\Cart;
use Domain\UserManagement\Repositories\CartRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class CartEloquentRepository implements CartRepositoryInterface
{
    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        return Cart::query()
            ->with(['product:id,name,picture,tag,author,price,stock,created_at,updated_at'])
            ->when(isset($filters['search']),
                fn($q) => $q->whereHas('product', function ($query) use ($filters) {
                    $query->where('name', 'like', '%' . $filters['search'] . '%');
                }))
            ->latest()
            ->paginate(perPage: $perPage, page: $filters['page']);
    }

    public function findCart(int $productIt, int $userId): ?Cart
    {
        return Cart::where('product_id', $productIt)->where('user_id', $userId)->first();
    }

    public function findByIdOrFail(string|int $id): Cart
    {
        return Cart::findOrFail($id);
    }

    public function create(array $data): Cart
    {
        return Cart::create($data);
    }

    public function update(Cart $model, array $data): Cart
    {
        $model->update($data);

        return $model->fresh();
    }

    public function delete(Cart $model): bool
    {
        return (bool)$model->delete();
    }

    public function isDataExists(int $productId, int $userId): bool
    {
        return Cart::where('product_id', $productId)->where('user_id', $userId)->exists();
    }
}
