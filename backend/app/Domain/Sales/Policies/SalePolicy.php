<?php

namespace Domain\Sales\Policies;

use Domain\UserManagement\Enums\Role;
use Domain\UserManagement\Models\User;

class SalePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->role === Role::ADMIN->value;
    }

    public function view(User $user): bool
    {
        return $user->role === Role::ADMIN->value;
    }

    public function export(User $user): bool
    {
        return $user->role === Role::ADMIN->value;
    }
}
