<?php

namespace App\Providers;

use Domain\Inventory\Repositories\ProductRepositoryInterface;
use Domain\Purchase\Repositories\RequisitionRepositoryInterface;
use Domain\Purchase\Repositories\SupplierRepositoryInterface;
use Domain\Sales\Repositories\SaleRepositoryInterface;
use Domain\UserManagement\Repositories\CartRepositoryInterface;
use Domain\UserManagement\Repositories\TransactionRepositoryInterface;
use Domain\UserManagement\Repositories\UserRepositoryInterface;
use Infrastructure\Persistence\Eloquent\Inventory\ProductEloquentRepository;
use Infrastructure\Persistence\Eloquent\Purchase\RequisitionEloquentRepository;
use Infrastructure\Persistence\Eloquent\Purchase\SupplierEloquentRepository;
use Infrastructure\Persistence\Eloquent\Sales\SaleEloquentRepository;
use Infrastructure\Persistence\Eloquent\UserManagement\CartEloquentRepository;
use Infrastructure\Persistence\Eloquent\UserManagement\TransactionEloquentRepository;
use Infrastructure\Persistence\Eloquent\UserManagement\UserEloquentRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register():void{
        $this->app->bind(UserRepositoryInterface::class,UserEloquentRepository::class);
        $this->app->bind(CartRepositoryInterface::class, CartEloquentRepository::class);
        $this->app->bind(TransactionRepositoryInterface::class, TransactionEloquentRepository::class);

        $this->app->bind(SaleRepositoryInterface::class,SaleEloquentRepository::class);

        $this->app->bind(RequisitionRepositoryInterface::class, RequisitionEloquentRepository::class);
        $this->app->bind(SupplierRepositoryInterface::class,SupplierEloquentRepository::class);

        $this->app->bind(ProductRepositoryInterface::class,ProductEloquentRepository::class);
    }

    public function boot():void{
    }
}
