<?php

namespace Application\UserManagement\Transaction;

use Domain\UserManagement\Models\Transaction;
use Domain\UserManagement\Services\TransactionService;

readonly class DeleteTransactionUseCase
{
    public function __construct(private TransactionService $service) {}

    public function __invoke(Transaction $model): void
    {
        $this->service->delete($model);
    }
}
