<?php

namespace Domain\UserManagement\Repositories;

use Domain\UserManagement\Models\Cart;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface CartRepositoryInterface
{
    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator;

    public function findCart(int $productIt, int $userId): ?Cart;

    public function findByIdOrFail(string|int $id): Cart;

    public function create(array $data): Cart;

    public function update(Cart $model, array $data): Cart;

    public function delete(Cart $model): bool;

    public function isDataExists(int $productId, int $userId): bool;
}
