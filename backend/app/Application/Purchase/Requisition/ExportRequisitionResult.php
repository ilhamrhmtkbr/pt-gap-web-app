<?php

namespace Application\Purchase\Requisition;

use Illuminate\Support\Collection;

readonly class ExportRequisitionResult
{
    public function __construct(
        public Collection $data,
        public array $meta = [],
    ) {}

    public function toArray(): array
    {
        return [
            'data' => $this->data,
            'meta' => $this->meta,
        ];
    }
}
