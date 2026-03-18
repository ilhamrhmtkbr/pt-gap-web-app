<?php

namespace Application\UserManagement\Transaction;

readonly class TransactionItemDTO
{
    public function __construct(
        public int $productId,
        public int $quantity,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            productId: $data['product_id'],
            quantity: $data['quantity'],
        );
    }

    public function toArray(): array
    {
        return [
            'product_id' => $this->productId,
            'quantity'   => $this->quantity,
        ];
    }
}
