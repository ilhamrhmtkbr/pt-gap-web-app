<?php

namespace Domain\UserManagement\Policies;

use Domain\UserManagement\Enums\Role;
use Domain\UserManagement\Models\User;

class TransactionPolicy
{

    public function viewAny(User $user): bool
    {
        return $user->role === Role::USER->value;
    }

    public function view(User $user): bool
    {
        return $user->role === Role::USER->value;
    }

    public function create(User $user): bool
    {
        return $user->role === Role::USER->value;
    }

    public function update(User $user): bool
    {
        return $user->role === Role::USER->value;
    }

    public function delete(User $user): bool
    {
        return $user->role === Role::USER->value;
    }
}
