<?php

namespace Domain\UserManagement\Repositories;

use Domain\UserManagement\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface UserRepositoryInterface
{
    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator;

    public function findById(string|int $id): ?User;

    public function findByIdOrFail(string|int $id): User;

    public function findByEmail(string $email): ?User;

    public function create(array $data): User;

    public function update(User $model, array $data): User;

    public function delete(User $model): bool;

    public function isDataExists(string|int $id): bool;

    /**
     * Ambil data untuk export (tanpa pagination)
     */
    public function getExportData(
        ?string $startDate = null,
        ?string $endDate   = null,
        ?string $companyId = null,
        ?string $branchId  = null,
    ): Collection;
}
