<?php

namespace Tests\Unit\Purchase\Repositories;

use Domain\Purchase\Models\Requisition;
use Infrastructure\Persistence\Eloquent\Purchase\RequisitionEloquentRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RequisitionRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected RequisitionEloquentRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new RequisitionEloquentRepository();
    }

    /** @test */
    public function findById_returns_model_when_exists()
    {
        $model  = Requisition::factory()->create();
        $result = $this->repository->findById($model->getKey());
        $this->assertInstanceOf(Requisition::class, $result);
    }

    /** @test */
    public function findById_returns_null_when_not_exists()
    {
        $this->assertNull($this->repository->findById(999999));
    }

    /** @test */
    public function findByIdOrFail_returns_model_when_exists()
    {
        $model  = Requisition::factory()->create();
        $result = $this->repository->findByIdOrFail($model->getKey());
        $this->assertInstanceOf(Requisition::class, $result);
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
        Requisition::factory()->count(20)->create();
        $result = $this->repository->paginate(10);
        $this->assertEquals(10, $result->count());
        $this->assertEquals(20, $result->total());
    }

    /** @test */
    public function create_stores_new_record()
    {
        $data   = Requisition::factory()->make()->toArray();
        $result = $this->repository->create($data);
        $this->assertInstanceOf(Requisition::class, $result);
    }

    /** @test */
    public function update_modifies_existing_record()
    {
        $model  = Requisition::factory()->create();
        $result = $this->repository->update($model, $model->toArray());
        $this->assertInstanceOf(Requisition::class, $result);
    }

    /** @test */
    public function delete_soft_deletes_record()
    {
        $model  = Requisition::factory()->create();
        $result = $this->repository->delete($model);
        $this->assertTrue($result);
        $this->assertSoftDeleted($model);
    }
}
