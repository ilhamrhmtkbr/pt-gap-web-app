<?php

namespace Presentation\Http\Resources\Purchase;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Presentation\Http\Resources\Inventory\ProductResource;

class RequisitionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->getKey(),
            'supplier'   => SupplierResource::make($this->whenLoaded('supplier'))->name ?? '',
            'product_name' => ProductResource::make($this->whenLoaded('product'))->name ?? '',
            'product_price' => ProductResource::make($this->whenLoaded('product'))->price ?? '',
            'quantity'   => $this->qty,
            'total_price'=> rupiah($this->total_price) ?? $this->total_price,
            'created_at' => $this->created_at?->translatedFormat('l, d F Y H:i'),
            'updated_at' => $this->updated_at?->translatedFormat('l, d F Y H:i'),
        ];
    }
}
