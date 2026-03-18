<?php

namespace Infrastructure\Email\UserManagement;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendVerificationLink extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    private string $signedUrl;
    private string $name;
    private string $email;

    /**
     * Create a new message instance.
     */
    public function __construct(string $signedUrl, string $name, string $email)
    {
        $this->signedUrl = $signedUrl;
        $this->name = $name;
        $this->email = $email;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('noreply@iamra.site', 'pt-gap.iamra.site'),
            to: [new Address($this->email, $this->name)],
            replyTo: [
                new Address('support@iamra.site', 'pt-gap.iamra.site')
            ],
            subject: 'Verify Email',
            tags: ['user-verification'],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.mail-verify',
            with: [
                'signedUrl' => $this->signedUrl,
                'name' => $this->name
            ],

        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
