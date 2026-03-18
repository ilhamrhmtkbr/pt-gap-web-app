<?php

namespace Application\UserManagement\Cart;

readonly class CartDTO
{
    public function __construct(
        public ?string $id = null,
        public ?int $productId = null,
        public ?int $quantity = null,
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            productId: $data['product_id'] ?? null,
            quantity: $data['quantity'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'user_id' => auth()->user()->id,
            'product_id' => $this->productId,
            'quantity' => $this->quantity,
        ];
    }
}
