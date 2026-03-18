<?php

namespace Domain\Purchase\Repositories;

use Domain\Purchase\Models\Supplier;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface SupplierRepositoryInterface
{
    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator;

    public function findById(string|int $id): ?Supplier;

    public function findByIdOrFail(string|int $id): Supplier;

    public function create(array $data): Supplier;

    public function update(Supplier $model, array $data): Supplier;

    public function delete(Supplier $model): bool;

    public function isDataExists(string $name): bool;

    public function getExportData(
        ?string $startDate = null,
        ?string $endDate   = null
    ): Collection;
}
