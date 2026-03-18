<?php

namespace Application\Inventory\Product;

use Domain\Inventory\Models\Product;
use Domain\Inventory\Services\ProductService;

readonly class DeleteProductUseCase
{
    public function __construct(private ProductService $service) {}

    public function __invoke(Product $model): bool
    {
        return $this->service->delete($model);
    }
}
