<?php

namespace Application\UserManagement\Auth;

class LoginDTO
{
    public function __construct(
        private string $email,
        private string $password
    ) {}

    public static function fromRequest(array $request): self
    {
        return new self(
            email: $request['email'],
            password: $request['password']
        );
    }

    public function toArray(): array
    {
        return [
            'email' => $this->email,
            'password' => $this->password
        ];
    }
}
