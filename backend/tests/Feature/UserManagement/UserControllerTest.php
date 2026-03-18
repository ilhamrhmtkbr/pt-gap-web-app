<?php

namespace Tests\Feature\UserManagement;

use Domain\UserManagement\Models\User;
use Domain\UserManagement\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Gate;
use Tests\TestCase;

class UserControllerTest extends TestCase
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
    public function admin_can_view_user_list()
    {
        User::factory()->count(5)->create();

        $this->actingAs($this->admin)
            ->getJson(route('UserManagement.User.index'))
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [['id', 'created_at', 'updated_at']],
                'filters',
            ]);
    }

    /** @test */
    public function guest_cannot_view_user_list()
    {
        $this->actingAs($this->guest)
            ->getJson(route('UserManagement.User.index'))
            ->assertStatus(403);
    }

    /** @test */
    public function admin_can_store_user()
    {
        $data = ['name' => 'Test User']; // TODO: sesuaikan field

        $this->actingAs($this->admin)
            ->postJson(route('UserManagement.User.store'), $data)
            ->assertStatus(201)
            ->assertJsonStructure(['message', 'data']);
    }

    /** @test */
    public function guest_cannot_store_user()
    {
        $this->actingAs($this->guest)
            ->postJson(route('UserManagement.User.store'), ['name' => 'Test'])
            ->assertStatus(403);
    }

    /** @test */
    public function admin_can_show_user()
    {
        $model = User::factory()->create();

        $this->actingAs($this->admin)
            ->getJson(route('UserManagement.User.show', $model))
            ->assertStatus(200)
            ->assertJsonStructure(['data' => ['id', 'created_at', 'updated_at']]);
    }

    /** @test */
    public function admin_can_update_user()
    {
        $model = User::factory()->create();

        $this->actingAs($this->admin)
            ->putJson(route('UserManagement.User.update', $model), ['name' => 'Updated'])
            ->assertStatus(200)
            ->assertJsonStructure(['message', 'data']);
    }

    /** @test */
    public function guest_cannot_update_user()
    {
        $model = User::factory()->create();

        $this->actingAs($this->guest)
            ->putJson(route('UserManagement.User.update', $model), ['name' => 'Updated'])
            ->assertStatus(403);
    }

    /** @test */
    public function admin_can_delete_user()
    {
        $model = User::factory()->create();

        $this->actingAs($this->admin)
            ->deleteJson(route('UserManagement.User.destroy', $model))
            ->assertStatus(200)
            ->assertJsonStructure(['message']);

        $this->assertSoftDeleted('users', ['id' => $model->id]);
    }

    /** @test */
    public function guest_cannot_delete_user()
    {
        $model = User::factory()->create();

        $this->actingAs($this->guest)
            ->deleteJson(route('UserManagement.User.destroy', $model))
            ->assertStatus(403);
    }
}
