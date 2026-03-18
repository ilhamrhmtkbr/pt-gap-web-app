<?php

namespace Application\UserManagement\Auth;

class LoginWithGoogleDTO
{
    public function __construct(
        public ?string $credential = null
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            credential: $data['credential']
        );
    }

    public function toArray(): array
    {
        return [
            'credential' => $this->credential,
        ];
    }
}
