<?php

namespace Tests\Unit\Purchase\Services;

use Domain\Purchase\Models\Supplier;
use Domain\Purchase\Repositories\SupplierRepositoryInterface;
use Domain\Purchase\Services\SupplierService;
use Illuminate\Http\Response;
use Mockery;
use Tests\TestCase;

class SupplierServiceTest extends TestCase
{
    protected SupplierService $service;
    protected $repositoryMock;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repositoryMock = Mockery::mock(SupplierRepositoryInterface::class);
        $this->service        = new SupplierService($this->repositoryMock);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    /** @test */
    public function get_calls_repository_paginate()
    {
        $filters = ['search' => 'test', 'per_page' => 20];
        $this->repositoryMock->shouldReceive('paginate')->once()->with(20, $filters)->andReturn(collect());
        $this->assertNotNull($this->service->get($filters));
    }

    /** @test */
    public function show_calls_repository_findByIdOrFail()
    {
        $model = Supplier::factory()->make(['id' => 1]);
        $this->repositoryMock->shouldReceive('findByIdOrFail')->once()->with('1')->andReturn($model);
        $this->assertEquals($model, $this->service->show('1'));
    }

    /** @test */
    public function create_throws_conflict_when_data_exists()
    {
        $this->repositoryMock->shouldReceive('isDataExists')->once()->with('1')->andReturn(true);
        $this->expectException(\Exception::class);
        $this->expectExceptionCode(Response::HTTP_CONFLICT);
        $this->service->create(['id' => '1', 'name' => 'Test']);
    }

    /** @test */
    public function create_calls_repository_when_data_not_exists()
    {
        $data  = ['id' => '1', 'name' => 'Test'];
        $model = Supplier::factory()->make($data);
        $this->repositoryMock->shouldReceive('isDataExists')->once()->andReturn(false);
        $this->repositoryMock->shouldReceive('create')->once()->with($data)->andReturn($model);
        $this->assertEquals($model, $this->service->create($data));
    }

    /** @test */
    public function update_calls_repository_update()
    {
        $model   = Supplier::factory()->make();
        $data    = ['name' => 'Updated'];
        $updated = Supplier::factory()->make($data);
        $this->repositoryMock->shouldReceive('update')->once()->with($model, $data)->andReturn($updated);
        $this->assertEquals($updated, $this->service->update($model, $data));
    }

    /** @test */
    public function delete_calls_repository_delete()
    {
        $model = Supplier::factory()->make();
        $this->repositoryMock->shouldReceive('delete')->once()->with($model)->andReturn(true);
        $this->assertTrue($this->service->delete($model));
    }
}
