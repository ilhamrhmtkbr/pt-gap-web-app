<?php

namespace Domain\UserManagement\Policies;

use Domain\UserManagement\Enums\Role;
use Domain\UserManagement\Models\Cart;
use Domain\UserManagement\Models\User;

class CartPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->role === Role::USER->value;
    }

    public function create(User $user): bool
    {
        return $user->role === Role::USER->value;
    }

    public function update(User $user, Cart $model): bool
    {
        return $user->id === $model->user_id;
    }

    public function delete(User $user, Cart $model): bool
    {
        return $user->id === $model->user_id;
    }
}
