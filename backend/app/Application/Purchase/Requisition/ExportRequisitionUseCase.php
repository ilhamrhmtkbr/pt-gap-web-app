<?php

namespace Application\Purchase\Requisition;

use Domain\Purchase\Repositories\RequisitionRepositoryInterface;
use Illuminate\Support\Facades\Auth;

readonly class ExportRequisitionUseCase
{
    public function __construct(
        private RequisitionRepositoryInterface $repository,
    ) {}

    public function __invoke(ExportRequisitionDTO $dto): ExportRequisitionResult
    {
        $data = $this->repository->getExportData(
            startDate: $dto->startDate,
            endDate:   $dto->endDate,
        );

        return new ExportRequisitionResult(
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
