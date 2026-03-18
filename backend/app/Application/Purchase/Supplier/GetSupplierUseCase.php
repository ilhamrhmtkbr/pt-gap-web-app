<?php

namespace Application\Purchase\Supplier;

use Domain\Purchase\Services\SupplierService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

readonly class GetSupplierUseCase
{
    public function __construct(private SupplierService $service) {}

    public function __invoke(array $filters = []): LengthAwarePaginator
    {
        return $this->service->get($filters);
    }
}
