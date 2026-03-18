<?php

namespace Application\Sales\Sale;

readonly class SaleDTO
{
    public function __construct(
        public ?string $id = null,
        // TODO: tambahkan field sesuai kolom di tabel
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            // TODO: tambahkan field sesuai kebutuhan
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            // TODO: tambahkan field sesuai kebutuhan
        ];
    }
}
