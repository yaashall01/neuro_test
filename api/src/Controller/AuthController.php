<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api')]
class AuthController extends AbstractController
{
    #[Route('/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher,
        ValidatorInterface $validator,
        LoggerInterface $logger
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $fullname = $data['fullname'] ?? null;

        $email = $data['email'] ?? null;
        $plainPassword = $data['password'] ?? null;

        if (!$email || !$plainPassword) {
            return $this->json(['error' => 'Email and password are required'], 400);
        }


        $existingUser = $em->getRepository(User::class)->findOneBy(['email' => $email]);
        if ($existingUser) { 
            return $this->json(['error' => 'Email is already in use'], 400);
        }

        $user = new User();
        $user->setFullname($fullname);
        $user->setEmail($email);
        $user->setRoles(['ROLE_USER']); 

        $hashedPassword = $passwordHasher->hashPassword($user, $plainPassword);
        $user->setPassword($hashedPassword);

        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $err) {
                $errorMessages[$err->getPropertyPath()] = $err->getMessage();
            }
            return $this->json($errorMessages, 400);
        }

        $em->persist($user);
        $em->flush();

        $logger->info("New user registered: {$email}");

        return $this->json([
            'message' => 'User registered successfully'
        ], 201);
    }
}
