<?php

namespace App\DTO\User;

use Symfony\Component\Validator\Constraints as Assert;

class UserRequest
{
    #[Assert\NotBlank]
    #[Assert\Email]
    private ?string $email = null;

    private ?string $fullname = null;

    private array $roles = []; 

    // #[Assert\NotBlank]
    #[Assert\Length(min: 6)]
    private ?string $password = null;

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): void
    {
        $this->email = $email;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function setRoles(array $roles): void
    {
        $this->roles = $roles;
    }

    public function getFullname(): ?string
    {
        return $this->fullname;
    }
    
    public function setFullname(?string $fullname): void
    {
        $this->fullname = $fullname;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(?string $password): void
    {
        $this->password = $password;
    }
}
