<?php

namespace Infrastructure\Persistence\Eloquent\UserManagement;

use Domain\UserManagement\Models\Transaction;
use Domain\UserManagement\Repositories\TransactionRepositoryInterface;
use Domain\UserManagement\Scopes\MustSameUser;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class TransactionEloquentRepository implements TransactionRepositoryInterface
{
    public function paginate(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        return Transaction::query()
            ->when(isset($filters['search']), fn ($q) =>
                $q->where('products', 'like', '%'.$filters['search'].'%')
            )
            ->orderBy($filters['sort_by'], $filters['sort_direction'])
            ->latest()
            ->paginate(perPage: $perPage, page: $filters['page']);
    }

    public function findById(string|int $id): ?Transaction
    {
        return Transaction::find($id);
    }

    public function findByIdOrFail(string|int $id): Transaction
    {
        return Transaction::findOrFail($id);
    }

    public function findByOrderId(string $orderId): Transaction
    {
        return Transaction::query()->withoutGlobalScope(MustSameUser::class)->where('order_id', $orderId)->first();
    }

    public function create(array $data): Transaction
    {
        return Transaction::create($data);
    }

    public function update(Transaction $model, array $data): Transaction
    {
        $model->update($data);

        return $model->fresh();
    }

    public function delete(Transaction $model): bool
    {
        return (bool) $model->delete();
    }

    public function isDataExists(string|int $id): bool
    {
        return Transaction::where('id', $id)->exists();
    }

    public function getExportData(
        ?string $startDate = null,
        ?string $endDate   = null,
    ): Collection {
        return Transaction::query()
            ->list()
            ->when($startDate, fn ($q) => $q->whereDate('created_at', '>=', $startDate))
            ->when($endDate,   fn ($q) => $q->whereDate('created_at', '<=', $endDate))
            ->get();
    }
}
