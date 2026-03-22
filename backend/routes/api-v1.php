<?php

use App\Presentation\Http\Controllers\UserManagement\AuthController;
use Domain\Inventory\Models\Product;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Support\Facades\Route;
use Presentation\Http\Controllers\Inventory\ProductController;
use Presentation\Http\Controllers\Sales\SaleController;
use Presentation\Http\Controllers\UserManagement\CartController;
use Presentation\Http\Controllers\UserManagement\TransactionController;
use Presentation\Http\Controllers\UserManagement\UserController;
use Presentation\Http\Controllers\Purchase\{RequisitionController, SupplierController};

Route::controller(AuthController::class)->prefix('auth')->group(function () {
    Route::post('/login-with-google', 'loginWithGoogle');
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::post('/logout', 'logout');
    Route::get('/me', 'me')->middleware(['jwt']);
    Route::get('/refresh', 'refresh');
});

Route::apiResource('products', ProductController::class);

Route::middleware(['jwt', \Illuminate\Routing\Middleware\SubstituteBindings::class])->group(function () {
    Route::post('products/export/pdf', [ProductController::class, 'exportPdf']);
    Route::post('products/export/excel', [ProductController::class, 'exportExcel']);

    Route::prefix('purchase')->group(function () {
        Route::get('requisition', [RequisitionController::class, 'index']);
        Route::get('requisition/{requisition}', [RequisitionController::class, 'show']);
        Route::post('requisition', [RequisitionController::class, 'store']);
        Route::post('requisition/export/pdf', [RequisitionController::class, 'exportPdf']);
        Route::post('requisition/export/excel', [RequisitionController::class, 'exportExcel']);

        Route::get('supplier', [SupplierController::class, 'index']);
        Route::get('supplier/{supplier}', [SupplierController::class, 'show']);
        Route::post('supplier', [SupplierController::class, 'store']);
        Route::patch('supplier/{supplier}', [SupplierController::class, 'update']);
        Route::delete('supplier/{supplier}', [SupplierController::class, 'destroy']);
        Route::post('supplier/export/pdf', [SupplierController::class, 'exportPdf']);
        Route::post('supplier/export/excel', [SupplierController::class, 'exportExcel']);
    });

    Route::get('sales', [SaleController::class, 'index']);
    Route::get('sales/{sales}', [SaleController::class, 'show']);
    Route::post('sales/export/pdf', [SaleController::class, 'exportPdf']);
    Route::post('sales/export/excel', [SaleController::class, 'exportExcel']);

});

Route::prefix('users')->group(function () {
    Route::post('transactions/midtrans', [TransactionController::class, 'midtrans']);
    Route::apiResource('transactions', TransactionController::class);

    Route::apiResource('carts', CartController::class)->middleware(['jwt', SubstituteBindings::class]);

    Route::post('/export/pdf',   [UserController::class, 'exportPdf']);
    Route::post('/export/excel', [UserController::class, 'exportExcel']);

    Route::get('/',        [UserController::class, 'index']);
    Route::get('/{user}',    [UserController::class, 'show']);
    Route::patch('/{user}',    [UserController::class, 'update']);
    Route::delete('/{user}', [UserController::class, 'destroy']);
});

Route::get('email/verify/{id}/{hash}', [AuthController::class, 'verify'])->middleware('signed')->name('email.verify');
