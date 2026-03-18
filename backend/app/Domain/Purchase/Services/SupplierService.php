<?php

namespace Domain\Purchase\Services;

use Domain\Purchase\Models\Supplier;
use Domain\Purchase\Repositories\SupplierRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class SupplierService
{
    public function __construct(
        private readonly SupplierRepositoryInterface $repository,
    ) {}

    public function get(array $filters = []): LengthAwarePaginator
    {
        $perPage = (int) ($filters['per_page'] ?? 15);

        $filters['sort_by'] = $filters['sort_by'] ?? 'created_at';
        if (!in_array($filters['sort_by'], ['name', 'created_at'])) {
            throw new \Exception('Sort by field is not match.', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $filters['sort_direction'] = $filters['sort_direction'] ?? 'desc';
        if (!in_array($filters['sort_direction'], ['asc', 'desc'])) {
            throw new \Exception('Sort direction is not match.', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $filters['page'] = $filters['page'] ?? 1;

        return $this->repository->paginate($perPage, $filters);
    }

    public function show(string|int $id): Supplier
    {
        return $this->repository->findByIdOrFail($id);
    }

    public function create(array $data): Supplier
    {
        if ($this->repository->isDataExists($data['name'])) {
            throw new \Exception(
                message: "Supplier sudah ada.",
                code: Response::HTTP_CONFLICT,
            );
        }

        return $this->repository->create($data);
    }

    public function update(Supplier $model, array $data): Supplier
    {
        return $this->repository->update($model, $data);
    }

    public function delete(Supplier $model): bool
    {
        return $this->repository->delete($model);
    }
}
