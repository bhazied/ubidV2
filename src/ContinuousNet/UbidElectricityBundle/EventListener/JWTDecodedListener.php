<?php

namespace ContinuousNet\UbidElectricityBundle\EventListener;

use Doctrine\ORM\EntityManager;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTDecodedEvent;
use ContinuousNet\UbidElectricityBundle\Entity\Visit;
use ContinuousNet\UbidElectricityBundle\Entity\Hit;

/**
 * JWTDecodedListener
 *
 * @author Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 */
class JWTDecodedListener
{
    
    protected $em;
    protected $maxInactivityTime;

    function __construct(EntityManager $em, $maxInactivityTime)
    {
        $this->em = $em;
        $this->maxInactivityTime = $maxInactivityTime;
    }
    
    /**
     * @param JWTDecodedEvent $event
     *
     * @return void
     */
    public function onJWTDecoded(JWTDecodedEvent $event)
    {
        if (!($request = $event->getRequest())) {
            return;
        }

        $payload = $event->getPayload();
        $request = $event->getRequest();
        
        if (isset($payload['visit'])) {
            $visitRepository = $this->em->getRepository('UbidElectricityBundle:Visit');
            $visit = $visitRepository->find($payload['visit']);
            if ($visit && !$visit->getIsValid()) {
                $event->markAsInvalid();
            } else {
                $lastTime = $visit->getModifiedAt();
                if (is_null($lastTime)) {
                    $lastTime = $visit->getCreatedAt();
                }
                $now = new \DateTime('now');
                $diff = $now->getTimestamp() - $lastTime->getTimestamp();
                if ($diff > $this->maxInactivityTime) {
                    $event->markAsInvalid();
                } else {

                    $userRepository = $this->em->getRepository('UbidElectricityBundle:User');
                    $user = $userRepository->findOneByEmail($payload['email']);
                    $visit->setModifierUser($user);
                    $visit->setModifiedAt($now);
                    $this->em->flush();
                    
                    $hit = new Hit();
                    $hit->setVisit($visit);
                    $hit->setUrl($request->getPathInfo());
                    $hit->setEntity('');
                    $hit->setForeignKey('');
                    $hit->setCreatorUser($user);
                    $hit->setCreatedAt(new \DateTime('now'));
                    $this->em->persist($hit);
                    $this->em->flush();

                }
            }
        } else {
            $event->markAsInvalid();
        }

        //if (!isset($payload['ip']) || $payload['ip'] !== $request->getClientIp()) {
        //    $event->markAsInvalid();
        //}
        
    }
}
