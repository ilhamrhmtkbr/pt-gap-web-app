<?php

namespace Application\Inventory\Product;

use Domain\Inventory\Services\ProductService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

readonly class GetProductUseCase
{
    public function __construct(private ProductService $service) {}

    public function __invoke(array $filters = []): LengthAwarePaginator
    {
        return $this->service->get($filters);
    }
}
