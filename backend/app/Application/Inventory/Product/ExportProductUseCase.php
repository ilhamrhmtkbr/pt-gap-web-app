<?php

namespace Application\Inventory\Product;

use Domain\Inventory\Repositories\ProductRepositoryInterface;
use Illuminate\Support\Facades\Auth;

readonly class ExportProductUseCase
{
    public function __construct(
        private ProductRepositoryInterface $repository,
    ) {}

    public function __invoke(ExportProductDTO $dto): ExportProductResult
    {
        $data = $this->repository->getExportData(
            startDate: $dto->startDate,
            endDate:   $dto->endDate,
        );

        return new ExportProductResult(
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
