<?php

namespace Application\Purchase\Requisition;

use Domain\Purchase\Models\Requisition;
use Domain\Purchase\Services\RequisitionService;

readonly class CreateRequisitionUseCase
{
    public function __construct(private RequisitionService $service) {}

    public function __invoke(RequisitionDTO $dto): Requisition
    {
        return $this->service->create($dto->toArray());
    }
}
