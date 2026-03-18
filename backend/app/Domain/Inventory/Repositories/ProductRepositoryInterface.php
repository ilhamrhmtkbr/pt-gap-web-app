<?php

namespace Domain\Inventory\Repositories;

use Domain\Inventory\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface ProductRepositoryInterface
{
    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator;

    public function findById(string|int $id): ?Product;

    public function findByIdOrFail(string|int $id): Product;

    public function create(array $data): Product;

    public function update(Product $model, array $data): Product;

    public function delete(Product $model): bool;

    public function isDataExists(string $name): bool;

    public function getExportData(
        ?string $startDate = null,
        ?string $endDate   = null,
    ): Collection;
}
