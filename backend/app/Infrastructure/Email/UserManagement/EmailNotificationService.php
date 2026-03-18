<?php

namespace Infrastructure\Email\UserManagement;

use Domain\UserManagement\Models\User;
use Domain\UserManagement\Ports\EmailNotification;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;

class EmailNotificationService implements EmailNotification
{
    public function sendVerificationLink(User $user): void
    {
        $signedUrl = URL::temporarySignedRoute(
            'email.verify',
            now()->addMinutes(30),
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );
        Mail::send(new SendVerificationLink($signedUrl, $user->name, $user->email));
    }
}
