<?php

namespace Application\UserManagement\Auth;

use Domain\UserManagement\Services\AuthService;

readonly class LoginWithGoogleUseCase
{
    public function __construct(
        private AuthService $authService,
    ){}

    public function __invoke(LoginWithGoogleDTO $dto): ?string
    {
        return $this->authService->loginWithGoogle($dto->toArray());
    }
}
