<?php

namespace Infrastructure\Persistence\Eloquent\UserManagement;

use Domain\UserManagement\Models\User;
use Domain\UserManagement\Repositories\UserRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class UserEloquentRepository implements UserRepositoryInterface
{
    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        return User::query()
            ->when(isset($filters['search']), fn ($q) =>
                $q->where('name', 'like', '%'.$filters['search'].'%')
            )
            ->orderBy($filters['sort_by'], $filters['sort_direction'])
            ->latest()
            ->paginate(perPage: $perPage, page: $filters['page']);
    }

    public function findById(string|int $id): ?User
    {
        return User::query()->withoutGlobalScope('select_custom')->find($id);
    }

    public function findByIdOrFail(string|int $id): User
    {
        return User::query()->withoutGlobalScope('select_custom')->findOrFail($id);
    }

    public function findByEmail(string $email): ?User
    {
        return User::query()->withoutGlobalScope('select_custom')->where('email', $email)->first();
    }

    public function create(array $data): User
    {
        return User::create($data);
    }

    public function update(User $model, array $data): User
    {
        $model->update($data);

        return $model->fresh();
    }

    public function delete(User $model): bool
    {
        return (bool) $model->delete();
    }

    public function isDataExists(string|int $id): bool
    {
        return User::where('id', $id)->exists();
    }

    public function getExportData(
        ?string $startDate = null,
        ?string $endDate   = null,
        ?string $companyId = null,
        ?string $branchId  = null,
    ): Collection {
        return User::query()
            ->when($startDate, fn ($q) => $q->whereDate('created_at', '>=', $startDate))
            ->when($endDate,   fn ($q) => $q->whereDate('created_at', '<=', $endDate))
            ->when($companyId, fn ($q) => $q->where('company_id', $companyId))
            ->when($branchId,  fn ($q) => $q->where('branch_id', $branchId))
            ->get();
    }
}
