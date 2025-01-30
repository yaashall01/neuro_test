<?php

namespace App\Controller;

use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/users')]
class UserController extends AbstractController
{
    public function __construct(private UserService $userService) {}


    #[Route('/{id}', name: 'get_user', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN')]
    public function getUserById(int $id): JsonResponse
    {
        $user = $this->userService->getUserById($id);

        if (isset($user['errors'])) {
            return $this->json($user['errors'], $user['status']);
        }

        return $this->json($user['data'], $user['status']);
    }

    #[Route('', name: 'create_user', methods: ['POST'])]
    #[IsGranted('ROLE_ADMIN')]
    public function createUser(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $result = $this->userService->createUser($data);

        if (isset($result['errors'])) {
            return $this->json($result['errors'], $result['status']);
        }

        return $this->json($result['data'], $result['status']);
    }

    #[Route('', name: 'list_users', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN')]
    public function listUsers(): JsonResponse
    {
        $users = $this->userService->listUsers();
        return $this->json($users);
    }

    #[Route('/{id}', name: 'update_user', methods: ['PUT'])]
    #[IsGranted('ROLE_ADMIN')]
    public function updateUser(int $id, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $result = $this->userService->updateUser($id, $data);

        if (isset($result['errors'])) {
            return $this->json($result['errors'], $result['status']);
        }

        return $this->json($result['data'], $result['status']);
    }

    #[Route('/{id}', name: 'delete_user', methods: ['DELETE'])]
    #[IsGranted('ROLE_ADMIN')]
    public function deleteUser(int $id): JsonResponse
    {
        $result = $this->userService->deleteUser($id);

        if (isset($result['errors'])) {
            return $this->json($result['errors'], $result['status']);
        }

        return $this->json($result['data'], $result['status']);
    }
}
