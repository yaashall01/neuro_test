<?php

namespace App\DTO\User;

class UserResponse
{
    private ?int $id = null;
    private ?string $fullname = null;
    private ?string $email = null;
    private array $roles = [];

    public function __construct(int $id, string $fullname ,string $email, array $roles)
    {
        $this->id = $id;
        $this->fullname = $fullname;
        $this->email = $email;
        $this->roles = $roles;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function getFullname(): ?string
    {
        return $this->fullname;
    }

    public function setFullname(string $fullname): static
    {
        $this->fullname = $fullname;

        return $this;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }
}
