<?php

namespace App\Providers;

use Domain\Inventory\Models\Product;
use Domain\Inventory\Policies\ProductPolicy;
use Domain\Purchase\Models\Requisition;
use Domain\Purchase\Models\Supplier;
use Domain\Purchase\Policies\RequisitionPolicy;
use Domain\Purchase\Policies\SupplierPolicy;
use Domain\Sales\Models\Sale;
use Domain\Sales\Policies\SalePolicy;
use Domain\UserManagement\Models\Cart;
use Domain\UserManagement\Models\Transaction;
use Domain\UserManagement\Models\User;
use Domain\UserManagement\Policies\CartPolicy;
use Domain\UserManagement\Policies\TransactionPolicy;
use Domain\UserManagement\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Product::class => ProductPolicy::class,
        Requisition::class => RequisitionPolicy::class,
        Supplier::class => SupplierPolicy::class,
        Sale::class => SalePolicy::class,
        Cart::class => CartPolicy::class,
        Transaction::class => TransactionPolicy::class,
        User::class  => UserPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}
