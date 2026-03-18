<?php

namespace Application\Purchase\Supplier;

use Domain\Purchase\Models\Supplier;
use Domain\Purchase\Services\SupplierService;

readonly class DeleteSupplierUseCase
{
    public function __construct(private SupplierService $service) {}

    public function __invoke(Supplier $model): bool
    {
        return $this->service->delete($model);
    }
}
