<?php

namespace Tests\Feature\Purchase;

use Domain\Purchase\Models\Requisition;
use Domain\UserManagement\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Gate;
use Tests\TestCase;

class RequisitionControllerTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected User $guest;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create();
        $this->guest = User::factory()->create();

        // Admin: bypass semua policy (simulasi superuser / full permission)
        Gate::before(fn (User $user) => $user->is($this->admin) ? true : null);

        // Guest: policy aktif -> hasPermission() return false (tidak ada permission di DB)
    }

    /** @test */
    public function admin_can_view_requisition_list()
    {
        Requisition::factory()->count(5)->create();

        $this->actingAs($this->admin)
            ->getJson(route('Purchase.Requisition.index'))
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [['id', 'created_at', 'updated_at']],
                'filters',
            ]);
    }

    /** @test */
    public function guest_cannot_view_requisition_list()
    {
        $this->actingAs($this->guest)
            ->getJson(route('Purchase.Requisition.index'))
            ->assertStatus(403);
    }

    /** @test */
    public function admin_can_store_requisition()
    {
        $data = ['name' => 'Test Requisition']; // TODO: sesuaikan field

        $this->actingAs($this->admin)
            ->postJson(route('Purchase.Requisition.store'), $data)
            ->assertStatus(201)
            ->assertJsonStructure(['message', 'data']);
    }

    /** @test */
    public function guest_cannot_store_requisition()
    {
        $this->actingAs($this->guest)
            ->postJson(route('Purchase.Requisition.store'), ['name' => 'Test'])
            ->assertStatus(403);
    }

    /** @test */
    public function admin_can_show_requisition()
    {
        $model = Requisition::factory()->create();

        $this->actingAs($this->admin)
            ->getJson(route('Purchase.Requisition.show', $model))
            ->assertStatus(200)
            ->assertJsonStructure(['data' => ['id', 'created_at', 'updated_at']]);
    }

    /** @test */
    public function admin_can_update_requisition()
    {
        $model = Requisition::factory()->create();

        $this->actingAs($this->admin)
            ->putJson(route('Purchase.Requisition.update', $model), ['name' => 'Updated'])
            ->assertStatus(200)
            ->assertJsonStructure(['message', 'data']);
    }

    /** @test */
    public function guest_cannot_update_requisition()
    {
        $model = Requisition::factory()->create();

        $this->actingAs($this->guest)
            ->putJson(route('Purchase.Requisition.update', $model), ['name' => 'Updated'])
            ->assertStatus(403);
    }

    /** @test */
    public function admin_can_delete_requisition()
    {
        $model = Requisition::factory()->create();

        $this->actingAs($this->admin)
            ->deleteJson(route('Purchase.Requisition.destroy', $model))
            ->assertStatus(200)
            ->assertJsonStructure(['message']);

        $this->assertSoftDeleted('requisitions', ['id' => $model->id]);
    }

    /** @test */
    public function guest_cannot_delete_requisition()
    {
        $model = Requisition::factory()->create();

        $this->actingAs($this->guest)
            ->deleteJson(route('Purchase.Requisition.destroy', $model))
            ->assertStatus(403);
    }
}
