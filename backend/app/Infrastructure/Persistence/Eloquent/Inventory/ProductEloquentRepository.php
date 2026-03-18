<?php

namespace Infrastructure\Persistence\Eloquent\Inventory;

use Domain\Inventory\Models\Product;
use Domain\Inventory\Repositories\ProductRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class ProductEloquentRepository implements ProductRepositoryInterface
{
    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        return Product::query()
            ->when(isset($filters['search']), fn ($q) =>
                $q->where('name', 'like', '%'.$filters['search'].'%')
            )
            ->orderBy($filters['sort_by'], $filters['sort_direction'])
            ->withSum(['sales' => fn($q) => $q->withoutGlobalScopes()], 'quantity')
            ->paginate(perPage: $perPage, page: $filters['page']);
    }

    public function findById(string|int $id): ?Product
    {
        return Product::find($id);
    }

    public function findByIdOrFail(string|int $id): Product
    {
        return Product::findOrFail($id);
    }

    public function create(array $data): Product
    {
        return Product::create($data);
    }

    public function update(Product $model, array $data): Product
    {
        $model->update($data);

        return $model->fresh();
    }

    public function delete(Product $model): bool
    {
        return (bool) $model->delete();
    }

    public function isDataExists(string $name): bool
    {
        return Product::where('name', $name)->exists();
    }

    public function getExportData(
        ?string $startDate = null,
        ?string $endDate   = null,
    ): Collection {
        return Product::query()
            ->withSum(['sales' => fn($q) => $q->withoutGlobalScopes()], 'quantity')
            ->when($startDate, fn ($q) => $q->whereDate('created_at', '>=', $startDate))
            ->when($endDate,   fn ($q) => $q->whereDate('created_at', '<=', $endDate))
            ->get();
    }
}
