<?php

namespace Tests\Feature\Purchase;

use Domain\Purchase\Models\Supplier;
use Domain\UserManagement\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Gate;
use Tests\TestCase;

class SupplierControllerTest extends TestCase
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
    public function admin_can_view_supplier_list()
    {
        Supplier::factory()->count(5)->create();

        $this->actingAs($this->admin)
            ->getJson(route('Purchase.Supplier.index'))
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [['id', 'created_at', 'updated_at']],
                'filters',
            ]);
    }

    /** @test */
    public function guest_cannot_view_supplier_list()
    {
        $this->actingAs($this->guest)
            ->getJson(route('Purchase.Supplier.index'))
            ->assertStatus(403);
    }

    /** @test */
    public function admin_can_store_supplier()
    {
        $data = ['name' => 'Test Supplier']; // TODO: sesuaikan field

        $this->actingAs($this->admin)
            ->postJson(route('Purchase.Supplier.store'), $data)
            ->assertStatus(201)
            ->assertJsonStructure(['message', 'data']);
    }

    /** @test */
    public function guest_cannot_store_supplier()
    {
        $this->actingAs($this->guest)
            ->postJson(route('Purchase.Supplier.store'), ['name' => 'Test'])
            ->assertStatus(403);
    }

    /** @test */
    public function admin_can_show_supplier()
    {
        $model = Supplier::factory()->create();

        $this->actingAs($this->admin)
            ->getJson(route('Purchase.Supplier.show', $model))
            ->assertStatus(200)
            ->assertJsonStructure(['data' => ['id', 'created_at', 'updated_at']]);
    }

    /** @test */
    public function admin_can_update_supplier()
    {
        $model = Supplier::factory()->create();

        $this->actingAs($this->admin)
            ->putJson(route('Purchase.Supplier.update', $model), ['name' => 'Updated'])
            ->assertStatus(200)
            ->assertJsonStructure(['message', 'data']);
    }

    /** @test */
    public function guest_cannot_update_supplier()
    {
        $model = Supplier::factory()->create();

        $this->actingAs($this->guest)
            ->putJson(route('Purchase.Supplier.update', $model), ['name' => 'Updated'])
            ->assertStatus(403);
    }

    /** @test */
    public function admin_can_delete_supplier()
    {
        $model = Supplier::factory()->create();

        $this->actingAs($this->admin)
            ->deleteJson(route('Purchase.Supplier.destroy', $model))
            ->assertStatus(200)
            ->assertJsonStructure(['message']);

        $this->assertSoftDeleted('suppliers', ['id' => $model->id]);
    }

    /** @test */
    public function guest_cannot_delete_supplier()
    {
        $model = Supplier::factory()->create();

        $this->actingAs($this->guest)
            ->deleteJson(route('Purchase.Supplier.destroy', $model))
            ->assertStatus(403);
    }
}
