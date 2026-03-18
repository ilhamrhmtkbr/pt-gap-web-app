<?php

namespace Presentation\Http\Middleware;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtCookieMiddleware
{
    public function handle(Request $request, \Closure $next)
    {
        try {
            $token = $request->cookie('access_token');
            if (!$token) {
                return response()->json(['message' => 'Token not provided'], Response::HTTP_UNAUTHORIZED);
            }
            JWTAuth::setToken($token);
            $user = JWTAuth::authenticate();
            if (!$user) {
                return response()->json(['message' => 'User not found'], Response::HTTP_UNAUTHORIZED);
            }
            auth()->setUser($user);
        } catch (TokenExpiredException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNAUTHORIZED);
        } catch (JWTException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNAUTHORIZED);
        }

        return $next($request);
    }
}
