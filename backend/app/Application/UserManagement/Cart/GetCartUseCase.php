<?php

namespace Application\UserManagement\Cart;

use Domain\UserManagement\Services\CartService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

readonly class GetCartUseCase
{
    public function __construct(private CartService $service) {}

    public function __invoke(array $filters = []): LengthAwarePaginator
    {
        return $this->service->get($filters);
    }
}
