<?php

namespace Application\Sales\Sale;

use Domain\Sales\Models\Sale;
use Domain\Sales\Services\SaleService;

readonly class CreateSaleUseCase
{
    public function __construct(private SaleService $service) {}

    public function __invoke(SaleDTO $dto): Sale
    {
        return $this->service->create($dto->toArray());
    }
}
