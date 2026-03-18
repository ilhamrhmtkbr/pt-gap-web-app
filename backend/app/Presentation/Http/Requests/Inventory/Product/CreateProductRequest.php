<?php

namespace Presentation\Http\Requests\Inventory\Product;

use Illuminate\Foundation\Http\FormRequest;

class CreateProductRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'        => 'required|string',
            'picture'     => 'required|file|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'tag'         => 'required|string',
            'author'      => 'required|string',
            'price'       => 'required|numeric',
            'stock'       => 'required|numeric',
        ];
    }

    public function messages(): array
    {
        return [

        ];
    }
}
