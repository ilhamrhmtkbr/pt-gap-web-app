<?php

namespace Tests\Feature\Inventory;

use Domain\Inventory\Models\Product;
use Domain\UserManagement\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Gate;
use Tests\TestCase;

class ProductControllerTest extends TestCase
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
    public function admin_can_view_product_list()
    {
        Product::factory()->count(5)->create();

        $this->actingAs($this->admin)
            ->getJson(route('Inventory.ProductDetail.index'))
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [['id', 'created_at', 'updated_at']],
                'filters',
            ]);
    }

    /** @test */
    public function guest_cannot_view_product_list()
    {
        $this->actingAs($this->guest)
            ->getJson(route('Inventory.ProductDetail.index'))
            ->assertStatus(403);
    }

    /** @test */
    public function admin_can_store_product()
    {
        $data = ['name' => 'Test ProductDetail']; // TODO: sesuaikan field

        $this->actingAs($this->admin)
            ->postJson(route('Inventory.ProductDetail.store'), $data)
            ->assertStatus(201)
            ->assertJsonStructure(['message', 'data']);
    }

    /** @test */
    public function guest_cannot_store_product()
    {
        $this->actingAs($this->guest)
            ->postJson(route('Inventory.ProductDetail.store'), ['name' => 'Test'])
            ->assertStatus(403);
    }

    /** @test */
    public function admin_can_show_product()
    {
        $model = Product::factory()->create();

        $this->actingAs($this->admin)
            ->getJson(route('Inventory.ProductDetail.show', $model))
            ->assertStatus(200)
            ->assertJsonStructure(['data' => ['id', 'created_at', 'updated_at']]);
    }

    /** @test */
    public function admin_can_update_product()
    {
        $model = Product::factory()->create();

        $this->actingAs($this->admin)
            ->putJson(route('Inventory.ProductDetail.update', $model), ['name' => 'Updated'])
            ->assertStatus(200)
            ->assertJsonStructure(['message', 'data']);
    }

    /** @test */
    public function guest_cannot_update_product()
    {
        $model = Product::factory()->create();

        $this->actingAs($this->guest)
            ->putJson(route('Inventory.ProductDetail.update', $model), ['name' => 'Updated'])
            ->assertStatus(403);
    }

    /** @test */
    public function admin_can_delete_product()
    {
        $model = Product::factory()->create();

        $this->actingAs($this->admin)
            ->deleteJson(route('Inventory.ProductDetail.destroy', $model))
            ->assertStatus(200)
            ->assertJsonStructure(['message']);

        $this->assertSoftDeleted('products', ['id' => $model->id]);
    }

    /** @test */
    public function guest_cannot_delete_product()
    {
        $model = Product::factory()->create();

        $this->actingAs($this->guest)
            ->deleteJson(route('Inventory.ProductDetail.destroy', $model))
            ->assertStatus(403);
    }
}
