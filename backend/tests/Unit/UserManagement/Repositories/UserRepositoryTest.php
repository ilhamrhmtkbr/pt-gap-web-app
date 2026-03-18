<?php

namespace Tests\Unit\UserManagement\Repositories;

use Domain\UserManagement\Models\User;
use Infrastructure\Persistence\Eloquent\UserManagement\UserEloquentRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected UserEloquentRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new UserEloquentRepository();
    }

    /** @test */
    public function findById_returns_model_when_exists()
    {
        $model  = User::factory()->create();
        $result = $this->repository->findById($model->getKey());
        $this->assertInstanceOf(User::class, $result);
    }

    /** @test */
    public function findById_returns_null_when_not_exists()
    {
        $this->assertNull($this->repository->findById(999999));
    }

    /** @test */
    public function findByIdOrFail_returns_model_when_exists()
    {
        $model  = User::factory()->create();
        $result = $this->repository->findByIdOrFail($model->getKey());
        $this->assertInstanceOf(User::class, $result);
        $this->assertEquals($model->getKey(), $result->getKey());
    }

    /** @test */
    public function findByIdOrFail_throws_exception_when_not_exists()
    {
        $this->expectException(\Illuminate\Database\Eloquent\ModelNotFoundException::class);
        $this->repository->findByIdOrFail(999999);
    }

    /** @test */
    public function paginate_returns_paginated_results()
    {
        User::factory()->count(20)->create();
        $result = $this->repository->paginate(10);
        $this->assertEquals(10, $result->count());
        $this->assertEquals(20, $result->total());
    }

    /** @test */
    public function create_stores_new_record()
    {
        $data   = User::factory()->make()->toArray();
        $result = $this->repository->create($data);
        $this->assertInstanceOf(User::class, $result);
    }

    /** @test */
    public function update_modifies_existing_record()
    {
        $model  = User::factory()->create();
        $result = $this->repository->update($model, $model->toArray());
        $this->assertInstanceOf(User::class, $result);
    }

    /** @test */
    public function delete_soft_deletes_record()
    {
        $model  = User::factory()->create();
        $result = $this->repository->delete($model);
        $this->assertTrue($result);
        $this->assertSoftDeleted($model);
    }
}
