<?php

namespace Presentation\Http\Resources\UserManagement;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getKey(),
            'products' => $this->products,
            'midtrans_data' => $this->midtrans_data,
            'total_price' => rupiah($this->total_price),
            'status' => $this->status,
            'created_at' => $this->created_at?->translatedFormat('l, d F Y H:i'),
            'updated_at' => $this->updated_at?->translatedFormat('l, d F Y H:i'),
        ];
    }
}
