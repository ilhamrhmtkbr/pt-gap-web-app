<?php

namespace Domain\Inventory\Policies;

use Domain\UserManagement\Enums\Role;
use Domain\UserManagement\Models\User;

class ProductPolicy
{
    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function view(?User $user): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->role === Role::ADMIN->value;
    }

    public function update(User $user): bool
    {
        return $user->role === Role::ADMIN->value;
    }

    public function delete(User $user): bool
    {
        return $user->role === Role::ADMIN->value;
    }

    public function export(User $user): bool
    {
        return $user->role === Role::ADMIN->value;
    }
}
