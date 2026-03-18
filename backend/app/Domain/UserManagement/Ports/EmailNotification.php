<?php

namespace Domain\UserManagement\Ports;

use Domain\UserManagement\Models\User;

interface EmailNotification
{
    public function sendVerificationLink(User $user): void;
}
