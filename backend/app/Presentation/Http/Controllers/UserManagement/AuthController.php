<?php

namespace App\Presentation\Http\Controllers\UserManagement;

use Application\UserManagement\Auth\LoginDTO;
use Application\UserManagement\Auth\LoginUseCase;
use Application\UserManagement\Auth\LoginWithGoogleDTO;
use Application\UserManagement\Auth\LoginWithGoogleUseCase;
use Application\UserManagement\Auth\RegisterDTO;
use Application\UserManagement\Auth\RegisterUseCase;
use Application\UserManagement\Auth\VerifyUseCase;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Lang;
use Presentation\Helper\ResponseApiHelper;
use Presentation\Http\Controllers\Controller;
use Presentation\Http\Requests\UserManagement\Auth\LoginRequest;
use Presentation\Http\Requests\UserManagement\Auth\LoginWithGoogleRequest;
use Presentation\Http\Requests\UserManagement\Auth\RegisterRequest;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function __construct(
        readonly LoginUseCase $loginUseCase,
        readonly RegisterUseCase $registerUseCase,
        readonly LoginWithGoogleUseCase $loginWithGoogleUseCase,
        readonly VerifyUseCase $verifyUseCase,
    ) {}

    public function loginWithGoogle(LoginWithGoogleRequest $request): \Illuminate\Http\JsonResponse
    {
        try {
            $token = ($this->loginWithGoogleUseCase)(LoginWithGoogleDTO::fromRequest($request->validated()));
            return $this->respondWithToken($token);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid Google Token'], 401);
        }
    }

    public function login(LoginRequest $request): \Illuminate\Http\JsonResponse
    {
        try {
            $token = ($this->loginUseCase)(LoginDto::fromRequest($request->validated()));
            return $this->respondWithToken($token);
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode(),
            );
        }
    }

    public function register(RegisterRequest $request): \Illuminate\Http\JsonResponse
    {
        try {
            ($this->registerUseCase)(RegisterDTO::fromRequest($request->validated()));
            return ResponseApiHelper::send(
                Lang::get('request-auth.register-success'),
                Response::HTTP_CREATED
            );
        } catch (\Exception $e) {
            return ResponseApiHelper::send($e, $e->getCode());
        }
    }

    public function me(): \Illuminate\Http\JsonResponse
    {
        return response()->json(auth()->user());
    }

    public function logout(Request $request): \Illuminate\Http\JsonResponse
    {
        $token = $request->cookie('access_token');

        if (!$token) {
            return response()->json(['message' => 'Token not provided'], 401);
        }

        try {
            JWTAuth::setToken($token)->invalidate();
            return response()->json(['message' => 'Logged out'])
                ->withoutCookie('access_token')
                ->withoutCookie('refresh_token');
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            // Token sudah expired pun tetap logout — clear cookie saja
            return response()->json(['message' => 'Logged out'])
                ->withoutCookie('access_token')
                ->withoutCookie('refresh_token');
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['message' => 'Logout failed: ' . $e->getMessage()], 500);
        }
    }

    public function refresh(Request $request): \Illuminate\Http\JsonResponse
    {
        $refreshToken = $request->cookie('refresh_token');

        if (!$refreshToken) {
            return response()->json(['message' => 'Token not provided'], 401);
        }

        try {
            JWTAuth::setToken($refreshToken);
            $newToken = JWTAuth::refresh(); // invalidate lama, issue baru
            return $this->respondWithToken($newToken);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['message' => 'Token has expired'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['message' => 'Token is invalid'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['message' => 'Token error: ' . $e->getMessage()], 401);
        }
    }

    protected function respondWithToken($token): \Illuminate\Http\JsonResponse
    {
        return ResponseApiHelper::send(
            "Login successfully",
            Response::HTTP_OK,
            cookieToken: $token
        );
    }

    public function verify(string $id, string $hash): Response
    {
        try {
            return ($this->verifyUseCase)(compact('id', 'hash'));
        } catch (\Exception $e) {
            return response()->view('mail.member-email-verify', ['message' => $e->getMessage()]);
        }
    }
}
