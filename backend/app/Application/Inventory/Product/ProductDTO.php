<?php

namespace Application\Inventory\Product;

use Illuminate\Http\UploadedFile;

readonly class ProductDTO
{
    public function __construct(
        public ?string $id = null,
        public ?string $name = null,
        public ?UploadedFile $picture = null,
        public ?string $author = null,
        public ?string $tag = null,
        public ?int $price = null,
        public ?int $stock = null,
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            name: $data['name'] ?? null,
            picture: $data['picture'] ?? null,
            author: $data['author'] ?? null,
            tag: $data['tag'] ?? null,
            price: $data['price'] ?? null,
            stock: $data['stock'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'picture' => $this->picture,
            'author' => $this->author,
            'tag' => $this->tag,
            'price' => $this->price,
            'stock' => $this->stock,
        ];
    }
}
