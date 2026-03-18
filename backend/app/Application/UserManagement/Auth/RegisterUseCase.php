<?php

namespace Application\UserManagement\Auth;

use Domain\UserManagement\Models\User;
use Domain\UserManagement\Ports\EmailNotification;
use Domain\UserManagement\Services\AuthService;

readonly class RegisterUseCase
{
    public function __construct(
        private AuthService $authService,
        private EmailNotification $emailNotification,
    ) {}

    public function __invoke(RegisterDTO $data): ?User
    {
        $user = $this->authService->register($data->toArray());
        if ($user) {
            $this->emailNotification->sendVerificationLink($user);
        }
        return $user;
    }
}
