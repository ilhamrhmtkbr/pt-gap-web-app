<?php

namespace Domain\Purchase\Repositories;

use Domain\Purchase\Models\Requisition;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface RequisitionRepositoryInterface
{
    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator;

    public function findById(string|int $id): ?Requisition;

    public function findByIdOrFail(string|int $id): Requisition;

    public function create(array $data): Requisition;

    public function isDataExists(string|int $id): bool;

    /**
     * Ambil data untuk export (tanpa pagination)
     */
    public function getExportData(
        ?string $startDate = null,
        ?string $endDate   = null,
    ): Collection;
}
