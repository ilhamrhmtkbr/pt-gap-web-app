<?php

namespace Presentation\Http\Requests\UserManagement\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name' => 'string|required|max:255',
            'image'=> 'nullable|file|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'email' => 'required|string|email|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            // TODO: tambahkan pesan validasi
        ];
    }
}
