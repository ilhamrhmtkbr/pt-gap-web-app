<?php

namespace Presentation\Http\Requests\Purchase\Requisition;

use Illuminate\Foundation\Http\FormRequest;

class CreateRequisitionRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'supplier_id' => 'required|exists:purchase_suppliers,id',
            'product_id' => 'required|exists:inventory_products,id',
            'qty' => 'required|numeric|min:1',
        ];
    }

    public function messages(): array
    {
        return [
        ];
    }
}
