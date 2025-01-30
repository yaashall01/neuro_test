<?php

namespace App\Mapper;

use App\DTO\Product\ProductDTO;
use App\Entity\Product;

class ProductMapper
{

    public function createEntityFromDTO(ProductDTO $dto): Product
    {
        $product = new Product();
        $product->setName($dto->getName());
        $product->setDescription($dto->getDescription());
        $product->setPrice($dto->getPrice());
        $product->setStatus($dto->getStatus());
        $product->setImgPath($dto->getImgPath());

        return $product;
    }


    public function updateEntityFromDTO(Product $product, ProductDTO $dto): Product
    {
        $product->setName($dto->getName());
        $product->setDescription($dto->getDescription());
        $product->setPrice($dto->getPrice());
        $product->setStatus($dto->getStatus());
        $product->setImgPath($dto->getImgPath());


        return $product;
    }


    public function entityToDTO(Product $product): ProductDTO
    {
        $dto = new ProductDTO();
        $dto->setId($product->getId());
        $dto->setName($product->getName());
        $dto->setDescription($product->getDescription());
        $dto->setPrice($product->getPrice());
        $dto->setStatus($product->getStatus());
        $dto->setCreatedAt($product->getCreatedAt());
        $dto->setImgPath($product->getImgPath());

        return $dto;
    }
}
