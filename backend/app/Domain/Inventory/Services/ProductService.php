<?php

namespace Domain\Inventory\Services;

use Domain\Inventory\Models\Product;
use Domain\Inventory\Repositories\ProductRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class ProductService
{
    private const CACHE_TAG = 'products';
    private const CACHE_TTL = 3600; // 1 jam

    public function __construct(
        private readonly ProductRepositoryInterface $repository,
    ) {}

    public function get(array $filters = []): LengthAwarePaginator
    {
        $perPage = (int)($filters['per_page'] ?? 15);

        $filters['sort_by'] = $filters['sort_by'] ?? 'created_at';
        if (!in_array($filters['sort_by'], ['name', 'tags', 'created_at'])) {
            throw new \Exception('Sort by field is not match.', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $filters['sort_direction'] = $filters['sort_direction'] ?? 'desc';
        if (!in_array($filters['sort_direction'], ['asc', 'desc'])) {
            throw new \Exception('Sort direction is not match.', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $filters['page'] = $filters['page'] ?? 1;

        $cacheKey = 'paginate:' . md5(json_encode(array_merge($filters, ['per_page' => $perPage])));

        return Cache::tags([self::CACHE_TAG])->remember(
            $cacheKey,
            self::CACHE_TTL,
            fn () => $this->repository->paginate($perPage, $filters)
        );
    }

    public function show(string|int $id): Product
    {
        return Cache::tags([self::CACHE_TAG])->remember(
            "detail:{$id}",
            self::CACHE_TTL,
            fn () => $this->repository->findByIdOrFail($id)
        );
    }

    public function create(array $data): Product
    {
        if ($this->repository->isDataExists($data['name'])) {
            throw new \Exception(
                message: "ProductDetail sudah ada.",
                code: Response::HTTP_CONFLICT,
            );
        }

        $data['picture'] = $data['picture']->store('books', 'public');
        $product = $this->repository->create($data);

        $this->invalidateCache(); // flush semua cache products

        return $product;
    }

    public function update(Product $model, array $data): Product
    {
        if (isset($data['picture'])) {
            if (Storage::disk('public')->exists($model->picture)) {
                Storage::disk('public')->delete($model->picture);
            }
            $data['picture'] = $data['picture']->store('books', 'public');
        } else {
            $data['picture'] = $model->picture;
        }

        $product = $this->repository->update($model, $data);

        $this->invalidateCache(); // flush semua cache products

        return $product;
    }

    public function delete(Product $model): bool
    {
        if (Storage::disk('public')->exists($model->picture)) {
            Storage::disk('public')->delete($model->picture);
        }

        $result = $this->repository->delete($model);

        $this->invalidateCache(); // flush semua cache products

        return $result;
    }

    private function invalidateCache(): void
    {
        Cache::tags([self::CACHE_TAG])->flush();
    }
}
