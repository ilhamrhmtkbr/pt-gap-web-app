<?php

namespace Infrastructure\Persistence\Eloquent\Purchase;

use Domain\Purchase\Models\Supplier;
use Domain\Purchase\Repositories\SupplierRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class SupplierEloquentRepository implements SupplierRepositoryInterface
{
    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        return Supplier::query()
            ->when(isset($filters['search']), fn ($q) =>
                $q->where('name', 'like', '%'.$filters['search'].'%')
            )
            ->orderBy($filters['sort_by'], $filters['sort_direction'])
            ->latest()
            ->paginate(perPage: $perPage, page: $filters['page']);
    }

    public function findById(string|int $id): ?Supplier
    {
        return Supplier::find($id);
    }

    public function findByIdOrFail(string|int $id): Supplier
    {
        return Supplier::findOrFail($id);
    }

    public function create(array $data): Supplier
    {
        return Supplier::create($data);
    }

    public function update(Supplier $model, array $data): Supplier
    {
        $model->update($data);

        return $model->fresh();
    }

    public function delete(Supplier $model): bool
    {
        return (bool) $model->delete();
    }

    public function isDataExists(string $name): bool
    {
        return Supplier::where('name', $name)->exists();
    }

    public function getExportData(
        ?string $startDate = null,
        ?string $endDate   = null,
    ): Collection {
        return Supplier::query()
            ->when($startDate, fn ($q) => $q->whereDate('created_at', '>=', $startDate))
            ->when($endDate,   fn ($q) => $q->whereDate('created_at', '<=', $endDate))
            ->get();
    }
}
