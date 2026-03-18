<?php

namespace Infrastructure\Persistence\Eloquent\Purchase;

use Domain\Purchase\Models\Requisition;
use Domain\Purchase\Repositories\RequisitionRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class RequisitionEloquentRepository implements RequisitionRepositoryInterface
{
    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        return Requisition::query()
            ->with(['supplier:id,name', 'product:id,name,price'])
            ->when(isset($filters['search']), function ($query) {
                $query->whereHas('product', function ($query) {
                    $query->where('name', 'like', '%' . request('search') . '%');
                });
            })
            ->orderBy($filters['sort_by'], $filters['sort_direction'])
            ->latest()
            ->paginate(perPage: $perPage, page: $filters['page']);
    }

    public function findById(string|int $id): ?Requisition
    {
        return Requisition::find($id);
    }

    public function findByIdOrFail(string|int $id): Requisition
    {
        return Requisition::findOrFail($id);
    }

    public function create(array $data): Requisition
    {
        return Requisition::create($data);
    }

    public function isDataExists(string|int $id): bool
    {
        return Requisition::where('id', $id)->exists();
    }

    public function getExportData(
        ?string $startDate = null,
        ?string $endDate = null,
    ): Collection
    {
        return Requisition::query()
            ->with(['supplier:id,name', 'product:id,name,price'])
            ->when($startDate, fn($q) => $q->whereDate('created_at', '>=', $startDate))
            ->when($endDate, fn($q) => $q->whereDate('created_at', '<=', $endDate))
            ->get();
    }
}
