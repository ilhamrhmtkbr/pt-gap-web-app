<?php

namespace Application\UserManagement\User;

use Illuminate\Http\UploadedFile;

readonly class UserDTO
{
    public function __construct(
        public ?string $id = null,
        public ?string $name = null,
        public ?UploadedFile $image = null,
        public ?string $email = null,
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            name: $data['name'] ?? null,
            image: $data['image'] ?? null,
            email: $data['email'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'image' => $this->image,
            'email' => $this->email,
        ];
    }
}
