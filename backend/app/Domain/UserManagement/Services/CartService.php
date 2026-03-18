<?php

namespace Domain\UserManagement\Services;

use Domain\Inventory\Repositories\ProductRepositoryInterface;
use Domain\UserManagement\Models\Cart;
use Domain\UserManagement\Repositories\CartRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class CartService
{
    public function __construct(
        private readonly CartRepositoryInterface $repository,
        private readonly ProductRepositoryInterface $productRepository
    ) {}

    public function get(array $filters = []): LengthAwarePaginator
    {
        $perPage = (int) ($filters['per_page'] ?? 15);

        $filters['sort_by'] = $filters['sort_by'] ?? 'created_at';

        $filters['sort_direction'] = $filters['sort_direction'] ?? 'desc';
        if (!in_array($filters['sort_direction'], ['asc', 'desc'])) {
            throw new \Exception('Sort direction is not match.', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $filters['page'] = $filters['page'] ?? 1;

        return $this->repository->paginate($perPage, $filters);
    }

    public function create(array $data): Cart
    {
        $productPrice = $this->productRepository->findById($data['product_id'])->price;
        $data['total_price'] = $productPrice * $data['quantity'];
        if ($this->repository->isDataExists($data['product_id'], $data['user_id'])) {
            $cart = $this->repository->findCart($data['product_id'], $data['user_id']);
            $data['quantity'] = $cart->quantity + $data['quantity'];
            $data['total_price'] = $productPrice * $data['quantity'];
            return $this->repository->update($cart, $data);
        }

        return $this->repository->create($data);
    }

    public function update(Cart $model, array $data): Cart
    {
        $data['product_id'] = $model->product_id;
        $productPrice = $this->productRepository->findById($model->product_id)->price;
        $data['total_price'] = $productPrice * $data['quantity'];
        return $this->repository->update($model, $data);
    }

    public function delete(Cart $model): bool
    {
        return $this->repository->delete($model);
    }
}
