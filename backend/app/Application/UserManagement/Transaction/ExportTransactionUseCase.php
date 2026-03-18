<?php

namespace Application\UserManagement\Transaction;

use Domain\UserManagement\Repositories\TransactionRepositoryInterface;
use Illuminate\Support\Facades\Auth;

readonly class ExportTransactionUseCase
{
    public function __construct(
        private TransactionRepositoryInterface $repository,
    ) {}

    public function __invoke(ExportTransactionDTO $dto): ExportTransactionResult
    {
        $data = $this->repository->getExportData(
            startDate: $dto->startDate,
            endDate:   $dto->endDate,
            companyId: $dto->companyId,
            branchId:  $dto->branchId,
        );

        return new ExportTransactionResult(
            data: $data->toArray(),
            meta: [
                'period'       => $dto->getPeriodLabel(),
                'generated_at' => now()->format('d M Y, H:i'),
                'generated_by' => Auth::user()?->full_name ?? 'System',
                'total_records'=> count($data),
            ],
        );
    }
}
