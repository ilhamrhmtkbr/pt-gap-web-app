<?php

namespace Application\Purchase\Supplier;

readonly class SupplierDTO
{
    public function __construct(
        public ?string $id = null,
        public ?string $name = null,
        public ?string $address = null,
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            name: $data['name'] ?? null,
            address: $data['address'] ?? null
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
        ];
    }
}
