<?php

namespace Application\Purchase\Requisition;

use Domain\Purchase\Services\RequisitionService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

readonly class GetRequisitionUseCase
{
    public function __construct(private RequisitionService $service) {}

    public function __invoke(array $filters = []): LengthAwarePaginator
    {
        return $this->service->get($filters);
    }
}
