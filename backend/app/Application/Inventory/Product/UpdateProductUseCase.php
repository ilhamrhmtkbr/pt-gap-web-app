<?php

namespace Application\Inventory\Product;

use Domain\Inventory\Models\Product;
use Domain\Inventory\Services\ProductService;

readonly class UpdateProductUseCase
{
    public function __construct(private ProductService $service) {}

    public function __invoke(Product $model, ProductDTO $dto): Product
    {
        return $this->service->update($model, $dto->toArray());
    }
}
