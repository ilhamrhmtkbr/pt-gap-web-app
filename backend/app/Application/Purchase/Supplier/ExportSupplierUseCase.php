<?php

namespace Application\Purchase\Supplier;

use Domain\Purchase\Repositories\SupplierRepositoryInterface;
use Illuminate\Support\Facades\Auth;

readonly class ExportSupplierUseCase
{
    public function __construct(
        private SupplierRepositoryInterface $repository,
    ) {}

    public function __invoke(ExportSupplierDTO $dto): ExportSupplierResult
    {
        $data = $this->repository->getExportData(
            startDate: $dto->startDate,
            endDate:   $dto->endDate,
        );

        return new ExportSupplierResult(
            data: $data,
            meta: [
                'period'       => $dto->getPeriodLabel(),
                'generated_at' => now()->format('d M Y, H:i'),
                'generated_by' => Auth::user()?->name ?? 'System',
                'total_records'=> count($data),
            ],
        );
    }
}
