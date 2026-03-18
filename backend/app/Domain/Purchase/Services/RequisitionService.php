<?php

namespace Domain\Purchase\Services;

use Domain\Inventory\Repositories\ProductRepositoryInterface;
use Domain\Purchase\Models\Requisition;
use Domain\Purchase\Repositories\RequisitionRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Response;

class RequisitionService
{
    public function __construct(
        private readonly ProductRepositoryInterface $productRepository,
        private readonly RequisitionRepositoryInterface $repository,
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

    public function show(string|int $id): Requisition
    {
        return $this->repository->findByIdOrFail($id);
    }

    public function create(array $data): Requisition
    {
        $product = $this->productRepository->findById($data['product_id']);
        $data['total_price'] = $data['qty'] * $product->price;
        $this->productRepository->update($product, ['stock' => $product->stock + $data['qty']]);
        return $this->repository->create($data);
    }
}
