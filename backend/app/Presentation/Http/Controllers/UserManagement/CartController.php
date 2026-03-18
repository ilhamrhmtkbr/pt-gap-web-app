<?php

namespace Presentation\Http\Controllers\UserManagement;

use Application\UserManagement\Cart\CreateCartUseCase;
use Application\UserManagement\Cart\DeleteCartUseCase;
use Application\UserManagement\Cart\GetCartUseCase;
use Application\UserManagement\Cart\UpdateCartUseCase;
use Application\UserManagement\Cart\CartDTO;
use Domain\UserManagement\Models\Cart;
use Illuminate\Support\Facades\Lang;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;
use Presentation\Http\Controllers\Controller;
use Presentation\Helper\ResponseApiHelper;
use Presentation\Http\Requests\UserManagement\Cart\CreateCartRequest;
use Presentation\Http\Requests\UserManagement\Cart\UpdateCartRequest;
use Presentation\Http\Resources\UserManagement\CartResource;

class CartController extends Controller
{
    public function __construct(
        private readonly GetCartUseCase    $getCartUseCase,
        private readonly CreateCartUseCase $createCartUseCase,
        private readonly UpdateCartUseCase $updateCartUseCase,
        private readonly DeleteCartUseCase $deleteCartUseCase,
    ) {}

    public function index(Request $request): JsonResponse|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        Gate::authorize('viewAny', Cart::class);

        try {
            $filters = $request->only(['search', 'sort_by', 'sort_direction', 'per_page', 'page']);
            return CartResource::collection(($this->getCartUseCase)($filters));
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode(),
            );
        }
    }

    public function store(CreateCartRequest $request): JsonResponse
    {
        Gate::authorize('create', Cart::class);

        try {
            $result = ($this->createCartUseCase)(CartDTO::fromRequest($request->validated()));

            return ResponseApiHelper::send(
                Lang::get('request-data.store-success'),
                Response::HTTP_CREATED,
                new CartResource($result),
            );
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode() ?: Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function update(UpdateCartRequest $request, Cart $cart): JsonResponse
    {
        Gate::authorize('update', $cart);

        try {
            $result = ($this->updateCartUseCase)($cart, CartDTO::fromRequest($request->validated()));

            return ResponseApiHelper::send(
                Lang::get('request-data.update-success'),
                Response::HTTP_OK,
                new CartResource($result),
            );
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode() ?: Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function destroy(Cart $cart): JsonResponse
    {
        Gate::authorize('delete', $cart);

        try {
            ($this->deleteCartUseCase)($cart);

            return ResponseApiHelper::send(
                Lang::get('request-data.destroy-success'),
                Response::HTTP_OK,
            );
        } catch (\Exception $e) {
            return ResponseApiHelper::send(
                $e->getMessage(),
                $e->getCode() ?: Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
