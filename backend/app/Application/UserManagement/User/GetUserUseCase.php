<?php

namespace Application\UserManagement\User;

use Domain\UserManagement\Services\UserService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

readonly class GetUserUseCase
{
    public function __construct(private UserService $service) {}

    public function __invoke(array $filters = []): LengthAwarePaginator
    {
        return $this->service->get($filters);
    }
}
