<?php

namespace Domain\UserManagement\Services;

use Domain\UserManagement\Models\User;
use Domain\UserManagement\Repositories\UserRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class UserService
{
    public function __construct(
        private readonly UserRepositoryInterface $repository,
    ) {}

    public function get(array $filters = []): LengthAwarePaginator
    {
        $perPage = (int) ($filters['per_page'] ?? 15);

        $filters['sort_by'] = $filters['sort_by'] ?? 'created_at';
        if (!in_array($filters['sort_by'], ['name', 'created_at'])) {
            throw new \Exception('Sort by field is not match.', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $filters['sort_direction'] = $filters['sort_direction'] ?? 'desc';
        if (!in_array($filters['sort_direction'], ['asc', 'desc'])) {
            throw new \Exception('Sort direction is not match.', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $filters['page'] = $filters['page'] ?? 1;

        return $this->repository->paginate($perPage, $filters);
    }

    public function show(string|int $id): User
    {
        return $this->repository->findByIdOrFail($id);
    }

    public function update(User $model, array $data): User
    {
        if ($data['image'] !== null) {
            if ($model->image && Storage::disk('public')->exists($model->image)) {
                Storage::disk('public')->delete($model->image);
            }
            $data['image'] = $data['image']->store('user-images', 'public');
        }
        return $this->repository->update($model, $data);
    }

    public function delete(User $model): bool
    {
        return $this->repository->delete($model);
    }
}
