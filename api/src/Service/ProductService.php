<?php

namespace App\Service;

use App\DTO\Product\ProductDTO;
use App\Entity\Product;
use App\Mapper\ProductMapper;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\Response;
use App\Enum\ProductStatus;

class ProductService
{
    public function __construct(
        private ProductMapper $productMapper,
        private ValidatorInterface $validator,
        private EntityManagerInterface $entityManager,
        private LoggerInterface $logger,
        private ProductRepository $productRepository
    ) {
    }
    

    public function getProduct(int $id): array
    {
        $product = $this->productRepository->find($id);
        if (!$product) {
            return [
                'status' => Response::HTTP_NOT_FOUND,
                'errors' => ['Product not found']
            ];
        }

        $dto = $this->productMapper->entityToDTO($product);

        return [
            'status' => Response::HTTP_OK,
            'data'   => $this->dtoToArray($dto)
        ];
    }

    public function listProducts(): array
    {
        $products = $this->productRepository->findAll();
        $results = [];

        foreach ($products as $product) {
            $dto = $this->productMapper->entityToDTO($product);
            $results[] = $this->dtoToArray($dto);
        }

        return $results; 
    }

    public function createProduct(array $data): array
    {
        $dto = $this->arrayToDTO($data);

        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            return $this->formatValidationErrors($errors);
        }

        $product = $this->productMapper->createEntityFromDTO($dto);
        $this->entityManager->persist($product);
        $this->entityManager->flush();

        $this->logger->info(sprintf('Product created (ID %d)', $product->getId()));

        $outputDTO = $this->productMapper->entityToDTO($product);

        return [
            'status' => Response::HTTP_CREATED,
            'data'   => $this->dtoToArray($outputDTO)
        ];
    }

    public function updateProduct(int $id, array $data): array
    {
        $product = $this->productRepository->find($id);
        if (!$product) {
            return [
                'status' => Response::HTTP_NOT_FOUND,
                'errors' => ['Product not found']
            ];
        }

        $dto = $this->productMapper->entityToDTO($product); 
        if (isset($data['name'])) {
            $dto->setName($data['name']);
        }
        if (array_key_exists('description', $data)) {
            $dto->setDescription($data['description']);
        }
        if (isset($data['price'])) {
            $dto->setPrice($data['price']);
        }
        if (isset($data['status'])) {
            $dto->setStatus(ProductStatus::from($data['status']));
        }

        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            return $this->formatValidationErrors($errors);
        }

        $this->productMapper->updateEntityFromDTO($product, $dto);
        $this->entityManager->flush();

        $this->logger->info(sprintf('Product updated (ID %d)', $product->getId()));

        $outputDTO = $this->productMapper->entityToDTO($product);

        return [
            'status' => Response::HTTP_OK,
            'data'   => $this->dtoToArray($outputDTO)
        ];
    }

    public function deleteProduct(int $id): array
    {
        $product = $this->productRepository->find($id);
        if (!$product) {
            return [
                'status' => Response::HTTP_NOT_FOUND,
                'errors' => ['Product not found']
            ];
        }

        $this->entityManager->remove($product);
        $this->entityManager->flush();

        $this->logger->warning(sprintf('Product deleted (ID %d)', $id));

        return [
            'status' => Response::HTTP_NO_CONTENT,
            'data'   => []
        ];
    }

    // these are my Helper methods

    private function arrayToDTO(array $data): ProductDTO
    {
        $dto = new ProductDTO();
        if (isset($data['id'])) {
            $dto->setId($data['id']);
        }
        $dto->setName($data['name'] ?? null);
        $dto->setDescription($data['description'] ?? null);
        $dto->setPrice($data['price'] ?? null);
        $dto->setStatus(ProductStatus::from($data['status']));
        $dto->setImgPath($data['imgPath'] ?? null);

        return $dto;
    }

    private function dtoToArray(ProductDTO $dto): array
    {
        return [
            'id'          => $dto->getId(),
            'name'        => $dto->getName(),
            'description' => $dto->getDescription(),
            'price'       => $dto->getPrice(),
            'status'      => $dto->getStatus(),
            'createdAt'   => $dto->getCreatedAt()
                ? $dto->getCreatedAt()->format(\DateTimeInterface::ATOM)
                : null,
            'imgPath'     => $dto->getImgPath(),
        ];
    }

    private function formatValidationErrors(iterable $errors): array
    {
        $errorMessages = [];
        foreach ($errors as $error) {
            $errorMessages[$error->getPropertyPath()] = $error->getMessage();
        }

        return [
            'status' => Response::HTTP_BAD_REQUEST,
            'errors' => $errorMessages
        ];
    }
}
