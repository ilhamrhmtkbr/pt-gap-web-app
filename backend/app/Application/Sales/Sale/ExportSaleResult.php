<?php

namespace Application\Sales\Sale;

use Illuminate\Support\Collection;

readonly class ExportSaleResult
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
