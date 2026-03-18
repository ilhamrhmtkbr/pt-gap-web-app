<?php

namespace Tests\Unit\Inventory\Repositories;

use Domain\Inventory\Models\Product;
use Infrastructure\Persistence\Eloquent\Inventory\ProductEloquentRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected ProductEloquentRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new ProductEloquentRepository();
    }

    /** @test */
    public function findById_returns_model_when_exists()
    {
        $model  = Product::factory()->create();
        $result = $this->repository->findById($model->getKey());
        $this->assertInstanceOf(Product::class, $result);
    }

    /** @test */
    public function findById_returns_null_when_not_exists()
    {
        $this->assertNull($this->repository->findById(999999));
    }

    /** @test */
    public function findByIdOrFail_returns_model_when_exists()
    {
        $model  = Product::factory()->create();
        $result = $this->repository->findByIdOrFail($model->getKey());
        $this->assertInstanceOf(Product::class, $result);
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
        Product::factory()->count(20)->create();
        $result = $this->repository->paginate(10);
        $this->assertEquals(10, $result->count());
        $this->assertEquals(20, $result->total());
    }

    /** @test */
    public function create_stores_new_record()
    {
        $data   = Product::factory()->make()->toArray();
        $result = $this->repository->create($data);
        $this->assertInstanceOf(Product::class, $result);
    }

    /** @test */
    public function update_modifies_existing_record()
    {
        $model  = Product::factory()->create();
        $result = $this->repository->update($model, $model->toArray());
        $this->assertInstanceOf(Product::class, $result);
    }

    /** @test */
    public function delete_soft_deletes_record()
    {
        $model  = Product::factory()->create();
        $result = $this->repository->delete($model);
        $this->assertTrue($result);
        $this->assertSoftDeleted($model);
    }
}
