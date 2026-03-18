<?php

namespace Application\UserManagement\Auth;

use Domain\UserManagement\Services\AuthService;

readonly class LoginUseCase
{
    public function __construct(
        private AuthService $authService,
    ) {}

    public function __invoke(LoginDTO $loginDTO): ?string
    {
        return $this->authService->login($loginDTO->toArray());
    }
}
