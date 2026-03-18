<?php

namespace Application\UserManagement\Auth;

use Domain\UserManagement\Services\AuthService;

readonly class VerifyUseCase
{
    public function __construct(
        private AuthService $authService,
    ) {}

    public function __invoke(array $data): \Illuminate\Http\Response
    {
        return $this->authService->verifyEmail($data);
    }
}
