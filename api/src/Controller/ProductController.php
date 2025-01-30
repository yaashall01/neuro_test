<?php

namespace App\Controller;

use App\Service\ProductService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/products')]
class ProductController extends AbstractController
{
    private ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    #[Route('/{id}', name: 'get_product', methods: ['GET'])]
    public function getProduct(int $id): JsonResponse
    {
        $product = $this->productService->getProduct($id);

        return $this->json($product, Response::HTTP_OK);
    }


    #[Route('', name: 'list_products', methods: ['GET'])]
    public function listProducts(): JsonResponse
    {
        $products = $this->productService->listProducts();

        return $this->json($products, Response::HTTP_OK);
    }


    #[Route('', name: 'create_product', methods: ['POST'])]
    #[IsGranted('ROLE_ADMIN')]
    public function createProduct(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $result = $this->productService->createProduct($data);

        if (isset($result['errors'])) {
            return $this->json($result['errors'], $result['status']);
        }

        return $this->json($result['data'], $result['status']);
    }

    #[Route('/{id}', name: 'update_product', methods: ['PUT', 'PATCH'])]
    #[IsGranted('ROLE_ADMIN')]
    public function updateProduct(int $id, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $result = $this->productService->updateProduct($id, $data);

        if (isset($result['errors'])) {
            return $this->json($result['errors'], $result['status']);
        }

        return $this->json($result['data'], $result['status']);
    }


    #[Route('/{id}', name: 'delete_product', methods: ['DELETE'])]
    #[IsGranted('ROLE_ADMIN')]
    public function deleteProduct(int $id): JsonResponse
    {
        $result = $this->productService->deleteProduct($id);

        if (isset($result['errors'])) {
            return $this->json($result['errors'], $result['status']);
        }

        return $this->json($result['data'], $result['status']);
    }
}
