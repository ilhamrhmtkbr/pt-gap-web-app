<?php

namespace Domain\UserManagement\Enums;

enum Role: string {
    case ADMIN = 'admin';
    case USER = 'user';
}
