<?php

namespace Application\Purchase\Supplier;

use Domain\Purchase\Models\Supplier;
use Domain\Purchase\Services\SupplierService;

readonly class CreateSupplierUseCase
{
    public function __construct(private SupplierService $service) {}

    public function __invoke(SupplierDTO $dto): Supplier
    {
        return $this->service->create($dto->toArray());
    }
}
