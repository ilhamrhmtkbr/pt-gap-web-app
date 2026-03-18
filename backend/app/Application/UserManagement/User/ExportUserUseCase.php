<?php

namespace Application\UserManagement\User;

use Domain\UserManagement\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\Auth;

readonly class ExportUserUseCase
{
    public function __construct(
        private UserRepositoryInterface $repository,
    ) {}

    public function __invoke(ExportUserDTO $dto): ExportUserResult
    {
        $data = $this->repository->getExportData(
            startDate: $dto->startDate,
            endDate:   $dto->endDate,
            companyId: $dto->companyId,
            branchId:  $dto->branchId,
        );

        return new ExportUserResult(
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
