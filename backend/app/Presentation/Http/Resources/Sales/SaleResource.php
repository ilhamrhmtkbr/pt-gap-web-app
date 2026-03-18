<?php

namespace Presentation\Http\Resources\Sales;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Presentation\Http\Resources\Inventory\ProductResource;
use Presentation\Http\Resources\UserManagement\UserResource;

class SaleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->getKey(),
            'user'       => UserResource::make($this->whenLoaded('user')),
            'product'    => ProductResource::make($this->whenLoaded('product')),
            'quantity'   => $this->quantity,
            'total_price'=> rupiah($this->total_price),
            'created_at' => $this->created_at?->translatedFormat('l, d F Y H:i'),
            'updated_at' => $this->updated_at?->translatedFormat('l, d F Y H:i'),
        ];
    }
}
