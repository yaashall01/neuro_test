<?php

namespace App\EventSubscriber;

use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Entity\User; 

class JWTCreatedSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            Events::JWT_CREATED => 'onJWTCreated',
        ];
    }

    public function onJWTCreated(JWTCreatedEvent $event): void
    {
        $user = $event->getUser();
        
        if (!$user instanceof User) {
            return;
        }

        $data = $event->getData();
        
        $data['fullname'] = $user->getFullname();
        $data['email'] = $user->getEmail();
        $data['roles'] = $user->getRoles(); 

        $event->setData($data);
        
    }
}
