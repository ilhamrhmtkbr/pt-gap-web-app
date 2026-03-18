<?php

namespace Application\Purchase\Requisition;

readonly class RequisitionDTO
{
    public function __construct(
        public ?string $id = null,
        public ?int $supplierId = null,
        public ?int $productId = null,
        public ?int $qty = null,
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            supplierId: $data['supplier_id'] ?? null,
            productId: $data['product_id'] ?? null,
            qty: $data['qty'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'supplier_id' => $this->supplierId,
            'product_id' => $this->productId,
            'qty' => $this->qty,
        ];
    }
}
