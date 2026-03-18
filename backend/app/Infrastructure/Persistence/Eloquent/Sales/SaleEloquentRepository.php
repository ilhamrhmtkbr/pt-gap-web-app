<?php

namespace Infrastructure\Persistence\Eloquent\Sales;

use Domain\Sales\Models\Sale;
use Domain\Sales\Repositories\SaleRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class SaleEloquentRepository implements SaleRepositoryInterface
{
    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        return Sale::query()
            ->with(['user', 'product'])
            ->when(isset($filters['search']), fn ($q) =>
                $q->whereHas('product', function ($query) use ($filters) {
                    $query->where('name', 'like', '%'.$filters['search'].'%');
                })
            )
            ->orderBy($filters['sort_by'], $filters['sort_direction'])
            ->latest()
            ->paginate(perPage: $perPage, page: $filters['page']);
    }

    public function findById(string|int $id): ?Sale
    {
        return Sale::find($id);
    }

    public function findByIdOrFail(string|int $id): Sale
    {
        return Sale::findOrFail($id);
    }

    public function create(array $data): Sale
    {
        return Sale::create($data);
    }

    public function isDataExists(string|int $id): bool
    {
        return Sale::where('id', $id)->exists();
    }

    public function getExportData(
        ?string $startDate = null,
        ?string $endDate   = null,
    ): Collection {
        return Sale::query()
            ->with(['user:id,name', 'product:id,name'])
            ->when($startDate, fn ($q) => $q->whereDate('created_at', '>=', $startDate))
            ->when($endDate,   fn ($q) => $q->whereDate('created_at', '<=', $endDate))
            ->get();
    }
}
