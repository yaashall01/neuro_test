<?php

namespace App\Enum;

enum ProductStatus: string
{
    case DRAFT = 'DRAFT';
    case PUBLISHED = 'PUBLISHED';
    case ARCHIVED = 'ARCHIVED';
}
