<?php

namespace App\DTO\Product;

use Symfony\Component\Validator\Constraints as Assert;
use App\Enum\ProductStatus;

class ProductDTO
{
   
    private ?int $id = null;

    #[Assert\NotBlank]
    private ?string $name = null;

    private ?string $description = null;

    #[Assert\NotBlank]
    #[Assert\Positive]
    private ?string $price = null;

    private ?\DateTimeInterface $createdAt = null;

    private ?ProductStatus $status = null;

    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    private ?string $imgPath = null;

    public function getImgPath(): ?string
    {
        return $this->imgPath;
    }

    public function setImgPath(?string $imgPath): void
    {
        $this->imgPath = $imgPath;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getStatus(): ?ProductStatus
    {
        return $this->status;
    }

    public function setStatus(?ProductStatus $status): void
    {
        $this->status = $status;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(?string $price): void
    {
        $this->price = $price;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeInterface $createdAt): void
    {
        $this->createdAt = $createdAt;
    }
}
