<?php

namespace Application\UserManagement\Cart;

use Domain\UserManagement\Models\Cart;
use Domain\UserManagement\Services\CartService;

readonly class CreateCartUseCase
{
    public function __construct(private CartService $service) {}

    public function __invoke(CartDTO $dto): Cart
    {
        return $this->service->create($dto->toArray());
    }
}
