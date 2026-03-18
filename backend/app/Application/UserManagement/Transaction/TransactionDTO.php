<?php

namespace Application\UserManagement\Transaction;

readonly class TransactionDTO
{
    public function __construct(
        public ?string $id,
        public array $items
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            items: array_map(
                fn ($item) => TransactionItemDTO::fromArray($item),
                $data['items']
            )
        );
    }

    public function toArray(): array
    {
        return [
            'id'    => $this->id,
            'items' => array_map(
                fn ($item) => $item->toArray(),
                $this->items
            ),
        ];
    }
}
