<?php

namespace Application\UserManagement\Cart;

use Domain\UserManagement\Models\Cart;
use Domain\UserManagement\Services\CartService;

readonly class DeleteCartUseCase
{
    public function __construct(private CartService $service) {}

    public function __invoke(Cart $model): bool
    {
        return $this->service->delete($model);
    }
}
