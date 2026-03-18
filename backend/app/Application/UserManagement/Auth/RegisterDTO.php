<?php

namespace Application\UserManagement\Auth;

use Illuminate\Http\UploadedFile;

class RegisterDTO
{
    public function __construct(
        private string $name,
        private string $email,
        private string $password,
        private string $passwordConfirmation,
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            name: $data['name'],
            email: $data['email'],
            password: $data['password'],
            passwordConfirmation: $data['password_confirmation'],
        );
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'password' => $this->password,
            'passwordConfirmation' => $this->passwordConfirmation
        ];
    }
}
