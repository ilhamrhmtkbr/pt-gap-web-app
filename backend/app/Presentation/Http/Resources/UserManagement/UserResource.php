<?php

namespace Presentation\Http\Resources\UserManagement;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->getKey(),
            'name'       => $this->name,
            'avatar'     => $this->avatar,
            'image'      => $this->image,
            'email'      => $this->email,
            'is_verified'=> $this->email_verified_at !== null ? 'Verified' : 'Not Verified',
            'created_at' => $this->created_at?->translatedFormat('l, d F Y H:i'),
            'updated_at' => $this->updated_at?->translatedFormat('l, d F Y H:i'),
        ];
    }
}
