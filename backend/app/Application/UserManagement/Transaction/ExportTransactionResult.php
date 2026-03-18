<?php

namespace Application\UserManagement\Transaction;

readonly class ExportTransactionResult
{
    public function __construct(
        public array $data,
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
