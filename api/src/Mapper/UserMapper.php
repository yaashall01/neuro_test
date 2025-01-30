<?php

namespace App\Mapper;

use App\DTO\User\UserRequest;
use App\DTO\User\UserResponse;
use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserMapper
{
    public function __construct(
        private UserPasswordHasherInterface $passwordHasher
    ) {}

    public function createEntityFromInputDTO(UserRequest $dto): User
    {
        $user = new User();
        $user->setFullname($dto->getFullname());
        $user->setEmail($dto->getEmail());
        $hashedPassword = $this->passwordHasher->hashPassword($user, $dto->getPassword());
        $user->setPassword($hashedPassword);
        $user->setRoles($dto->getRoles()); 
        return $user;
    }

    public function updateEntityFromInputDTO(User $user, UserRequest $dto): User
    {
        $user->setFullname($dto->getFullname());
        $user->setEmail($dto->getEmail());
        $user->setRoles($dto->getRoles());
        // $hashedPassword = $this->passwordHasher->hashPassword($user, $dto->getPassword());
        // $user->setPassword($hashedPassword);
        return $user;
    }

    public function createOutputDTOFromEntity(User $user): UserResponse
    {
        return new UserResponse($user->getId(), $user->getFullname() , $user->getEmail(), $user->getRoles());
    }
}
