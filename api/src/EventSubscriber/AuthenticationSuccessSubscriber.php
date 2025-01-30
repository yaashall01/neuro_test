<?php

namespace App\EventSubscriber;

use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class AuthenticationSuccessSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            Events::AUTHENTICATION_SUCCESS => 'onAuthenticationSuccess'
        ];
    }

    public function onAuthenticationSuccess(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData(); 
        
        $data['message'] = 'Login successful!';
        
        $event->setData($data);
    }
}
