<?php

namespace Tests\Unit\Purchase\Policies;

use Domain\Purchase\Models\Supplier;
use Domain\Purchase\Policies\SupplierPolicy;
use Domain\UserManagement\Models\User;
use Mockery;
use Tests\TestCase;

class SupplierPolicyTest extends TestCase
{
    private SupplierPolicy $policy;
    private User $userWith;
    private User $userWithout;
    private Supplier $model;

    protected function setUp(): void
    {
        parent::setUp();

        $this->policy      = new SupplierPolicy();
        $this->userWith    = Mockery::mock(User::class);
        $this->userWithout = Mockery::mock(User::class);
        $this->model       = new Supplier();

        $this->userWith->allows('hasPermission')->andReturnUsing(fn ($p) => true);
        $this->userWithout->allows('hasPermission')->andReturnUsing(fn ($p) => false);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    /** @test */
    public function viewAny_returns_true_when_user_has_permission()
    {
        $this->assertTrue($this->policy->viewAny($this->userWith));
    }

    /** @test */
    public function viewAny_returns_false_when_user_lacks_permission()
    {
        $this->assertFalse($this->policy->viewAny($this->userWithout));
    }

    /** @test */
    public function view_returns_true_when_user_has_permission()
    {
        $this->assertTrue($this->policy->view($this->userWith, $this->model));
    }

    /** @test */
    public function create_returns_true_when_user_has_permission()
    {
        $this->assertTrue($this->policy->create($this->userWith));
        $this->assertFalse($this->policy->create($this->userWithout));
    }

    /** @test */
    public function update_returns_true_when_user_has_permission()
    {
        $this->assertTrue($this->policy->update($this->userWith, $this->model));
        $this->assertFalse($this->policy->update($this->userWithout, $this->model));
    }

    /** @test */
    public function delete_returns_true_when_user_has_permission()
    {
        $this->assertTrue($this->policy->delete($this->userWith, $this->model));
        $this->assertFalse($this->policy->delete($this->userWithout, $this->model));
    }

    /** @test */
    public function restore_uses_update_permission()
    {
        $this->assertTrue($this->policy->restore($this->userWith, $this->model));
        $this->assertFalse($this->policy->restore($this->userWithout, $this->model));
    }

    /** @test */
    public function forceDelete_uses_delete_permission()
    {
        $this->assertTrue($this->policy->forceDelete($this->userWith, $this->model));
        $this->assertFalse($this->policy->forceDelete($this->userWithout, $this->model));
    }

    /** @test */
    public function approve_returns_true_when_user_has_permission()
    {
        $this->assertTrue($this->policy->approve($this->userWith, $this->model));
        $this->assertFalse($this->policy->approve($this->userWithout, $this->model));
    }
}
