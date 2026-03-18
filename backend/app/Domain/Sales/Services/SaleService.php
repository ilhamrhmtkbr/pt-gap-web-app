<?php

namespace Domain\Sales\Services;

use Domain\Sales\Models\Sale;
use Domain\Sales\Repositories\SaleRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Response;

class SaleService
{
    public function __construct(
        private readonly SaleRepositoryInterface $repository,
    ) {}

    public function get(array $filters = []): LengthAwarePaginator
    {
        $perPage = (int) ($filters['per_page'] ?? 15);

        $filters['sort_by'] = $filters['sort_by'] ?? 'created_at';
        if (!in_array($filters['sort_by'], ['quantity', 'created_at'])) {
            throw new \Exception('Sort by field is not match.', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $filters['sort_direction'] = $filters['sort_direction'] ?? 'desc';
        if (!in_array($filters['sort_direction'], ['asc', 'desc'])) {
            throw new \Exception('Sort direction is not match.', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $filters['page'] = $filters['page'] ?? 1;

        return $this->repository->paginate($perPage, $filters);
    }

    public function show(string|int $id): Sale
    {
        return $this->repository->findByIdOrFail($id);
    }

    public function create(array $data): Sale
    {
        return $this->repository->create($data);
    }
}
