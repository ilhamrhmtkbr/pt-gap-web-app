<?php

namespace Domain\Sales\Repositories;

use Domain\Sales\Models\Sale;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface SaleRepositoryInterface
{
    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator;

    public function findById(string|int $id): ?Sale;

    public function findByIdOrFail(string|int $id): Sale;

    public function create(array $data): Sale;

    public function isDataExists(string|int $id): bool;

    public function getExportData(
        ?string $startDate = null,
        ?string $endDate   = null,
    ): Collection;
}
