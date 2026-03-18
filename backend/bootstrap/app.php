<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Presentation\Http\Middleware\AppLocaleMiddleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(function () {
        \Illuminate\Support\Facades\Route::prefix(config('app.api_version'))
            ->middleware('throttle:custom_limiter')
            ->group(base_path('/routes/api-v1.php'));
    })
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'jwt' => \Presentation\Http\Middleware\JwtCookieMiddleware::class,
        ]);

        $middleware->use([
            \Illuminate\Http\Middleware\HandleCors::class,
            AppLocaleMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
