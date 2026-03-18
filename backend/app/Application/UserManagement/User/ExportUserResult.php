<?php

namespace Application\UserManagement\User;

use Illuminate\Support\Collection;

readonly class ExportUserResult
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
