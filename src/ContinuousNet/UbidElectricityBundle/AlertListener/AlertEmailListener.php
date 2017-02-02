<?php

namespace ContinuousNet\UbidElectricityBundle\AlertListener;

use ContinuousNet\UbidElectricityBundle\Entity\Message;
use ContinuousNet\UbidElectricityBundle\Entity\Tender;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Symfony\Component\Translation\TranslatorInterface;

/**
 * AlertEmailListner
 *
 * @author Zied Ben Hadj Amor
 */
class AlertEmailListener
{

    protected  $alertMailer;

    function __construct(AlertMailer $_alertMailer)
    {
        $this->alertMailer = $_alertMailer;
    }

    public function postPersist(LifecycleEventArgs $args){
        $entity = $args->getEntity();
        if($entity instanceof Tender ){
            $entityManager = $args->getEntityManager();
        }
        else if($entity instanceof Bid){

        }
        else if($entity instanceof Message){

        }
        else{
            return;
        }
    }
}