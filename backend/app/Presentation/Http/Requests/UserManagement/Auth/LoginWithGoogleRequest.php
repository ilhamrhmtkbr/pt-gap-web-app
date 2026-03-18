<?php

namespace Presentation\Http\Requests\UserManagement\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginWithGoogleRequest extends FormRequest
{
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'credential' => 'required|string',
        ];
    }
}
