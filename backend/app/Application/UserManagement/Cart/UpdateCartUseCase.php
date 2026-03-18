<?php

namespace Application\UserManagement\Cart;

use Domain\UserManagement\Models\Cart;
use Domain\UserManagement\Services\CartService;

readonly class UpdateCartUseCase
{
    public function __construct(private CartService $service) {}

    public function __invoke(Cart $model, CartDTO $dto): Cart
    {
        return $this->service->update($model, $dto->toArray());
    }
}
