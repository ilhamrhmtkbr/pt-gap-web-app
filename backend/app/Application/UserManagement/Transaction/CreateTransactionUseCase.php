<?php

namespace Application\UserManagement\Transaction;

use Domain\UserManagement\Models\Transaction;
use Domain\UserManagement\Services\TransactionService;

readonly class CreateTransactionUseCase
{
    public function __construct(private TransactionService $service) {}

    public function __invoke(TransactionDTO $dto): Transaction
    {
        return $this->service->create($dto->toArray());
    }
}
