<?php

namespace Presentation\Http\Resources\Inventory;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getKey(),
            'name' => $this->name,
            'picture' => $this->picture,
            'tag' => $this->tag,
            'author' => $this->author,
            'price' => rupiah($this->price),
            'stock' => $this->stock,
            'sales' => $this->sales_sum_quantity ?? 0,
            'created_at' => $this->created_at?->translatedFormat('l, d F Y H:i'),
            'updated_at' => $this->updated_at?->translatedFormat('l, d F Y H:i'),
        ];
    }
}
