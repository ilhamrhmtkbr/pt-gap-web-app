<?php

namespace Application\Purchase\Supplier;

use Illuminate\Support\Collection;

readonly class ExportSupplierResult
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
