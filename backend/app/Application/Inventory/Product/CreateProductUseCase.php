<?php

namespace Application\Inventory\Product;

use Domain\Inventory\Models\Product;
use Domain\Inventory\Services\ProductService;

readonly class CreateProductUseCase
{
    public function __construct(private ProductService $service) {}

    public function __invoke(ProductDTO $dto): Product
    {
        return $this->service->create($dto->toArray());
    }
}
