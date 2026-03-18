<?php

namespace Domain\UserManagement\Policies;

use Domain\UserManagement\Enums\Role;
use Domain\UserManagement\Models\User;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->role === Role::ADMIN->value;
    }

    public function view(User $user): bool
    {
        return $user->role === Role::ADMIN->value;
    }

    public function update(User $user, User $model): bool
    {
        return $user->role === Role::ADMIN->value || $user->id == $model->id;
    }

    public function delete(User $user, User $model): bool
    {
        return $user->role === Role::ADMIN->value || $user->id == $model->id;
    }

    public function export(User $user): bool
    {
        return $user->role === Role::ADMIN->value;
    }
}
