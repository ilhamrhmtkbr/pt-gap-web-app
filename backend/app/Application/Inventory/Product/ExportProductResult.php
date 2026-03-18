<?php

namespace Application\Inventory\Product;

use Illuminate\Support\Collection;

readonly class ExportProductResult
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
