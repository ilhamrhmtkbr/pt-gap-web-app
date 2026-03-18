<?php

namespace Application\UserManagement\User;

use Domain\UserManagement\Models\User;
use Domain\UserManagement\Services\UserService;

readonly class UpdateUserUseCase
{
    public function __construct(private UserService $service) {}

    public function __invoke(User $model, UserDTO $dto): User
    {
        return $this->service->update($model, $dto->toArray());
    }
}
