<?php

namespace Tests\Feature\Sales;

use Domain\Sales\Models\Sale;
use Domain\UserManagement\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Gate;
use Tests\TestCase;

class SaleControllerTest extends TestCase
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
    public function admin_can_view_sale_list()
    {
        Sale::factory()->count(5)->create();

        $this->actingAs($this->admin)
            ->getJson(route('Sales.Sale.index'))
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [['id', 'created_at', 'updated_at']],
                'filters',
            ]);
    }

    /** @test */
    public function guest_cannot_view_sale_list()
    {
        $this->actingAs($this->guest)
            ->getJson(route('Sales.Sale.index'))
            ->assertStatus(403);
    }

    /** @test */
    public function admin_can_store_sale()
    {
        $data = ['name' => 'Test Sale']; // TODO: sesuaikan field

        $this->actingAs($this->admin)
            ->postJson(route('Sales.Sale.store'), $data)
            ->assertStatus(201)
            ->assertJsonStructure(['message', 'data']);
    }

    /** @test */
    public function guest_cannot_store_sale()
    {
        $this->actingAs($this->guest)
            ->postJson(route('Sales.Sale.store'), ['name' => 'Test'])
            ->assertStatus(403);
    }

    /** @test */
    public function admin_can_show_sale()
    {
        $model = Sale::factory()->create();

        $this->actingAs($this->admin)
            ->getJson(route('Sales.Sale.show', $model))
            ->assertStatus(200)
            ->assertJsonStructure(['data' => ['id', 'created_at', 'updated_at']]);
    }

    /** @test */
    public function admin_can_update_sale()
    {
        $model = Sale::factory()->create();

        $this->actingAs($this->admin)
            ->putJson(route('Sales.Sale.update', $model), ['name' => 'Updated'])
            ->assertStatus(200)
            ->assertJsonStructure(['message', 'data']);
    }

    /** @test */
    public function guest_cannot_update_sale()
    {
        $model = Sale::factory()->create();

        $this->actingAs($this->guest)
            ->putJson(route('Sales.Sale.update', $model), ['name' => 'Updated'])
            ->assertStatus(403);
    }

    /** @test */
    public function admin_can_delete_sale()
    {
        $model = Sale::factory()->create();

        $this->actingAs($this->admin)
            ->deleteJson(route('Sales.Sale.destroy', $model))
            ->assertStatus(200)
            ->assertJsonStructure(['message']);

        $this->assertSoftDeleted('sales', ['id' => $model->id]);
    }

    /** @test */
    public function guest_cannot_delete_sale()
    {
        $model = Sale::factory()->create();

        $this->actingAs($this->guest)
            ->deleteJson(route('Sales.Sale.destroy', $model))
            ->assertStatus(403);
    }
}
