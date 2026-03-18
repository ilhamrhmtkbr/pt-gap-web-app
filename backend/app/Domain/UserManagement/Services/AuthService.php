<?php

namespace Domain\UserManagement\Services;

use Domain\UserManagement\Models\User;
use Domain\UserManagement\Repositories\UserRepositoryInterface;
use Google\Client;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    public function __construct(
        private readonly UserRepositoryInterface $userRepository
    ) {}

    public static function generateJwt(User $user): ?string
    {
        $payload = [
            'email'=> $user->email,
            'name' => $user->name,
        ];

        return JWTAuth::claims($payload)->fromUser($user);
    }

    public function loginWithGoogle(array $data): ?string
    {
        $client = new Client([
            'client_id' => config('services.google.client_id')
        ]);

        $payload = $client->verifyIdToken($data['credential']);

        if (!$payload) {
            throw new \Exception('Invalid Google Token');
        }

        $user = $this->userRepository->findByEmail($payload['email']);

        if ($user) {
            $user->update([
                'google_id' => $payload['sub'],
                'avatar' => $payload['picture'],
            ]);
        } else {
            $user = $this->userRepository->create([
                'name' => $payload['name'],
                'email' => $payload['email'],
                'google_id' => $payload['sub'],
                'avatar' => $payload['picture'],
            ]);
        }

        return $this->generateJwt($user);
    }

    public function register(array $data): ?User
    {
        $user = $this->userRepository->findByEmail($data['email']);

        if ($user) {
            throw new \Exception('User already exists', 409);
        }

        return $this->userRepository->create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    public function login(array $data): ?string
    {
        $user = $this->userRepository->findByEmail($data['email']);

        if (!$user) {
            throw new \Exception('User not found', 422);
        }

        if ($user->email_verified_at == null) {
            throw new \Exception('Please verified email', 422);
        }

        if (!Hash::check($data['password'], $user->password)) {
            throw new \Exception('Wrong password', 422);
        }

        return $this->generateJwt($user);
    }

    public function verifyEmail(array $data): Response
    {
        $user = $this->userRepository->findById($data['id']);
        if (!$user) {
            throw new \Exception('User not found', 422);
        }

        if (sha1($user->email) != $data['hash']) {
            throw new \Exception('Wrong hash', 422);
        }

        $message = 'Your email has been successfully verified. Please reopen this application on the platform you are using, such as web or android.';

        if ($user->email_verified_at !== null) {
            $message = 'User has been verified';
            abort(Response::HTTP_BAD_REQUEST, 'User has been verified');
        }

        $newData = [
            'email_verified_at' => now(),
        ];

        $this->userRepository->update($user, $newData);

        return response()->view('mail.member-email-verify', [
            'message' => $user->email_verified_at
        ]);
    }
}
