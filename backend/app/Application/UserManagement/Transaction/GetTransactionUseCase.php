<?php

namespace Application\UserManagement\Transaction;

use Domain\UserManagement\Services\TransactionService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

readonly class GetTransactionUseCase
{
    public function __construct(private TransactionService $service) {}

    public function __invoke(array $filters = []): LengthAwarePaginator
    {
        return $this->service->get($filters);
    }
}
