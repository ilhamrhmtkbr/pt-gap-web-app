<?php

namespace Application\Sales\Sale;

use Domain\Sales\Services\SaleService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

readonly class GetSaleUseCase
{
    public function __construct(private SaleService $service) {}

    public function __invoke(array $filters = []): LengthAwarePaginator
    {
        return $this->service->get($filters);
    }
}
