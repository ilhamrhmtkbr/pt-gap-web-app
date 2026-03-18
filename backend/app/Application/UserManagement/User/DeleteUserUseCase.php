<?php

namespace Application\UserManagement\User;

use Domain\UserManagement\Models\User;
use Domain\UserManagement\Services\UserService;

readonly class DeleteUserUseCase
{
    public function __construct(private UserService $service) {}

    public function __invoke(User $model): bool
    {
        return $this->service->delete($model);
    }
}
