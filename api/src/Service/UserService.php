<?php

namespace App\Service;

use App\DTO\User\UserRequest;
use App\DTO\User\UserResponse;
use App\Entity\User;
use App\Mapper\UserMapper;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\Response;

class UserService
{
    public function __construct(
        private UserMapper $userMapper,
        private ValidatorInterface $validator,
        private EntityManagerInterface $entityManager,
        private LoggerInterface $logger,
        private UserRepository $userRepository
    ) {
    }



    public function getUserById(int $id): array
    {
        $user = $this->userRepository->find($id);

        if (!$user) {
            return [
                'status' => Response::HTTP_NOT_FOUND,
                'errors' => ['User not found']
            ];
        }

        $outputDTO = $this->userMapper->createOutputDTOFromEntity($user);

        return [
            'status' => Response::HTTP_OK,
            'data'   => $this->toArray($outputDTO)
        ];
    }


    public function createUser(array $data): array
    {
        $dto = new UserRequest();
        $dto->setFullname($data['fullname'] ?? null);
        $dto->setEmail($data['email'] ?? null);
        $dto->setPassword($data['password'] ?? null);
        $dto->setRoles($data['roles'] ?? ['ROLE_USER']);

        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return [
                'status' => Response::HTTP_BAD_REQUEST,
                'errors' => $errorMessages
            ];
        }

        $user = $this->userMapper->createEntityFromInputDTO($dto);
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $this->logger->info(sprintf('User created with ID %d (email: %s)', $user->getId(), $user->getEmail()));

        $outputDTO = $this->userMapper->createOutputDTOFromEntity($user);

        return [
            'status' => Response::HTTP_CREATED,
            'data'   => $this->toArray($outputDTO)
        ];
    }


    public function listUsers(): array
    {
        $users = $this->userRepository->findAll();
        $results = [];

        foreach ($users as $user) {
            $outputDTO = $this->userMapper->createOutputDTOFromEntity($user);
            $results[] = $this->toArray($outputDTO);
        }

        return $results;
    }


    public function updateUser(int $id, array $data): array
    {
        $user = $this->userRepository->find($id);

        if (!$user) {
            return [
                'status' => Response::HTTP_NOT_FOUND,
                'errors' => ['User not found']
            ];
        }

        $dto = new UserRequest();
        $dto->setFullname($data['fullname'] ?? $user->getFullname());
        $dto->setEmail($data['email'] ?? $user->getEmail());
        $dto->setRoles($data['roles'] ?? $user->getRoles());
        // $dto->setPassword($data['password'] ?? null);

        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return [
                'status' => Response::HTTP_BAD_REQUEST,
                'errors' => $errorMessages
            ];
        }

        $this->userMapper->updateEntityFromInputDTO($user, $dto);
        $this->entityManager->flush();

        $this->logger->info(sprintf('User updated with ID %d', $user->getId()));

        $outputDTO = $this->userMapper->createOutputDTOFromEntity($user);

        return [
            'status' => Response::HTTP_OK,
            'data'   => $this->toArray($outputDTO)
        ];
    }

    public function deleteUser(int $id): array
    {
        $user = $this->userRepository->find($id);

        if (!$user) {
            return [
                'status' => Response::HTTP_NOT_FOUND,
                'errors' => ['User not found']
            ];
        }

        $this->entityManager->remove($user);
        $this->entityManager->flush();

        $this->logger->warning(sprintf('User deleted with ID %d', $id));

        return [
            'status' => Response::HTTP_NO_CONTENT,
            'data'   => []
        ];
    }

    private function toArray(UserResponse $outputDTO): array
    {
        return [
            'id'    => $outputDTO->getId(),
            'fullname' => $outputDTO->getFullname(),
            'email' => $outputDTO->getEmail(),
            'roles' => $outputDTO->getRoles(),
        ];
    }
}
