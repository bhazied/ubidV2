<?php

namespace ContinuousNet\UbidElectricityBundle\EventListener;

use Doctrine\ORM\EntityManager;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use ContinuousNet\UbidElectricityBundle\Entity\Visit;

/**
 * JWTCreatedListener
 *
 * @author Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 */
class JWTCreatedListener
{
    
    protected $em;
    
    function __construct(EntityManager $em)
    {
        $this->em = $em;
    }
    
    /**
     * @param JWTCreatedEvent $event
     *
     * @return void
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        if (!($request = $event->getRequest())) {
            return;
        }
        
        $payload = $event->getData();

        $userRepository = $this->em->getRepository('UbidElectricityBundle:User');
        $user = $userRepository->findOneByEmail($payload['email']);
        
        $visitRepository = $this->em->getRepository('UbidElectricityBundle:Visit');
        $visits = $visitRepository->findBy(array('creatorUser' => $user->getId(), 'isValid' => true));
        foreach ($visits as $visit) {
            $visit->setIsValid(false);
        }
        $this->em->flush();
        
        $visit = new Visit();
        $visit->setIp($request->getClientIp());
        $visit->setIsValid(true);
        $visit->setUserAgent($request->headers->get('User-Agent'));
        $visit->setCreatorUser($user);
        $visit->setCreatedAt(new \DateTime('now'));
        $this->em->persist($visit);
        $this->em->flush();
        $payload['visit'] = $visit->getId();
        //$payload['ip'] = $request->getClientIp();
        
        $event->setData($payload);
    }
}
