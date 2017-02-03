<?php

namespace ContinuousNet\UbidElectricityBundle\EventListener;

use Doctrine\ORM\EntityManager;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Symfony\Component\Security\Core\User\UserInterface;
use ContinuousNet\UbidElectricityBundle\EventListener\UserSessionData;

/**
 * JWTResponseListener
 *
 * @author Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 */
class JWTResponseListener
{

    protected $em;
    protected $usd;
    
    function __construct(EntityManager $em, UserSessionData $usd)
    {
        $this->em = $em;
        $this->usd = $usd;
    }
    
    /**
     * Add public data to the authentication response
     *
     * @param AuthenticationSuccessEvent $event
     */
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();
        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }
        
        $userRepository = $this->em->getRepository('UbidElectricityBundle:User');
        $user = $userRepository->findOneByUsername($user->getusername());
        $user->setLoginCount($user->getLoginCount()+1);
        $user->setLastFailedLoginCount(0);
        $this->em->flush();
        $data['user'] = $this->usd->userData($user);

        $event->setData($data);
    }
    
    /**
     * Add public data to the authentication response
     *
     * @param AuthenticationFailureEvent $event
     */
    public function onAuthenticationFailureResponse(AuthenticationFailureEvent $event)
    {
        if (!($request = $event->getRequest())) {
            return;
        }
        $request = $event->getRequest();
        $email = $request->request->get('email');
        $userRepository = $this->em->getRepository('UbidElectricityBundle:User');
        $user = $userRepository->findOneByEmail($email);
        if ($user) {
            $user->setFailedLoginCount($user->getFailedLoginCount()+1);
            $user->setLastFailedLogin(new \DateTime('now'));
            $user->setLastFailedLoginCount($user->getLastFailedLoginCount()+1);
            $this->em->flush();
        }
    }
}
