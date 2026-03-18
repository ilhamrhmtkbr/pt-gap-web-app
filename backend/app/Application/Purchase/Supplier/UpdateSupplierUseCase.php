<?php

namespace Application\Purchase\Supplier;

use Domain\Purchase\Models\Supplier;
use Domain\Purchase\Services\SupplierService;

readonly class UpdateSupplierUseCase
{
    public function __construct(private SupplierService $service) {}

    public function __invoke(Supplier $model, SupplierDTO $dto): Supplier
    {
        return $this->service->update($model, $dto->toArray());
    }
}
