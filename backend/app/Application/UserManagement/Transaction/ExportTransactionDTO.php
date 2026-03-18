<?php

namespace Application\UserManagement\Transaction;

use Carbon\Carbon;

readonly class ExportTransactionDTO
{
    public function __construct(
        public ?string $startDate = null,
        public ?string $endDate   = null,
        public ?string $companyId = null,
        public ?string $branchId  = null,
        public string  $format    = 'excel',
        public string  $groupBy   = 'daily',
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            startDate: $data['start_date'] ?? Carbon::now()->startOfMonth()->toDateString(),
            endDate:   $data['end_date']   ?? Carbon::now()->toDateString(),
            companyId: $data['company_id'] ?? null,
            branchId:  $data['branch_id']  ?? null,
            format:    $data['format']     ?? 'excel',
            groupBy:   $data['group_by']   ?? 'daily',
        );
    }

    public function getPeriodLabel(): string
    {
        return Carbon::parse($this->startDate)->format('d M Y')
            . ' - '
            . Carbon::parse($this->endDate)->format('d M Y');
    }
}
