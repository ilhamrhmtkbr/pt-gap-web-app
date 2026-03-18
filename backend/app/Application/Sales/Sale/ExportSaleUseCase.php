<?php

namespace Application\Sales\Sale;

use Domain\Sales\Repositories\SaleRepositoryInterface;
use Illuminate\Support\Facades\Auth;

readonly class ExportSaleUseCase
{
    public function __construct(
        private SaleRepositoryInterface $repository,
    ) {}

    public function __invoke(ExportSaleDTO $dto): ExportSaleResult
    {
        $data = $this->repository->getExportData(
            startDate: $dto->startDate,
            endDate:   $dto->endDate,
        );

        return new ExportSaleResult(
            data: $data,
            meta: [
                'period'       => $dto->getPeriodLabel(),
                'generated_at' => now()->format('d M Y, H:i'),
                'generated_by' => Auth::user()?->full_name ?? 'System',
                'total_records'=> count($data),
            ],
        );
    }
}
