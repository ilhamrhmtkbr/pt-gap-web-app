<?php

namespace Domain\UserManagement\Repositories;

use Domain\UserManagement\Models\Transaction;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface TransactionRepositoryInterface
{
    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator;

    public function findById(string|int $id): ?Transaction;

    public function findByIdOrFail(string|int $id): Transaction;

    public function findByOrderId(string $orderId): Transaction;

    public function create(array $data): Transaction;

    public function update(Transaction $model, array $data): Transaction;

    public function delete(Transaction $model): bool;

    public function isDataExists(string|int $id): bool;

    /**
     * Ambil data untuk export (tanpa pagination)
     */
    public function getExportData(
        ?string $startDate = null,
        ?string $endDate   = null,
    ): Collection;
}
