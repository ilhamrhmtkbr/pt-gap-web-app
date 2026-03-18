<?php

namespace Presentation\Http\Requests\Purchase\Supplier;

use Illuminate\Foundation\Http\FormRequest;

class CreateSupplierRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'address' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            // TODO: tambahkan pesan validasi
        ];
    }
}
