<?php

namespace ContinuousNet\UbidElectricityBundle\AlertListener;

use ContinuousNet\UbidElectricityBundle\Entity\Buyer;
use ContinuousNet\UbidElectricityBundle\Entity\Message;
use ContinuousNet\UbidElectricityBundle\Entity\Tender;
use ContinuousNet\UbidElectricityBundle\Entity\Bid;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Event\LifecycleEventArgs;
use ContinuousNet\UbidElectricityBundle\Entity\User;
use Symfony\Component\Translation\TranslatorInterface;

use ContinuousNet\UbidElectricityBundle\Entity\Notification;

/**
 * AlertEmailListner
 *
 * @author Zied Ben Hadj Amor
 */
class AlertEmailListener
{

    protected  $alertMailer;

    protected $translator;

    function __construct(AlertMailer $_alertMailer,  TranslatorInterface $_translator)
    {
        $this->alertMailer = $_alertMailer;

        $this->translator = $_translator;
    }

    public function postPersist(LifecycleEventArgs $args){
        $entity = $args->getEntity();
        $entityManager = $args->getEntityManager();
        if($entity instanceof Message){
            $this->executePersistAction(
                $this->getUserAlerts($entityManager, $entity->getCreatorUser()),
                $entity
            );
        }
        else if($entity instanceof Bid){
            $this->executePersistAction(
                $this->getUserAlerts($entityManager, $entity->getTender()->getCreatorUser()),
                $entity
            );
        }
        else{
            return;
        }
    }

    public function postUpdate(LifecycleEventArgs $args){
        $entity = $args->getEntity();
        $entityManager  = $args->getEntityManager();
        if($entity instanceof Bid){
            $changesets = $entityManager->getUnitOfWork()->getEntityChangeSet($entity);
            if(array_key_exists('status', $changesets)){
                    if($changesets['status'][0] == "Shortlisted"){
                        $this->executeUpdateAction(
                            $this->getUserAlerts($entityManager, $entity->getCreatorUser()),
                            $entity
                        );
                    }
            }
        }
        else{
            return;
        }
    }


    private function getUserAlerts(EntityManager $entityManager, User $user){
        $qb = $entityManager->createQueryBuilder();
        $qb->from('UbidElectricityBundle:UserSetting', 'us_');
        $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\User', 'creator_user', \Doctrine\ORM\Query\Expr\Join::WITH, 'us_.creatorUser = creator_user.id');
        $qb->where('us_.creatorUser = :user')->setParameter('user', $user);
        $qb->select('us_');
        $user_alerts = $qb->getQuery()->getResult();
        if($user_alerts){
            return $user_alerts;
        }
        return false;
    }

    private function executePersistAction($user_alerts,  $entity){
        if(!$user_alerts){
            return;
        }
        $className = get_class($entity);
        $reflection = new \ReflectionClass($className);
        $shortNameClass =  lcfirst($reflection->getShortName());
        $method = "new_".$shortNameClass;
        foreach ($user_alerts as $alert){
            /*if($alert->getKey() == "BID_SHORLISTED" && $alert->getValue() == "ON"){
                $this->alertMailer->$method($entity, false);
            }*/
            if($alert->getKey() == "RECEIVED_NEW_MESSAGE" && $alert->getValue() == "ON" && $shortNameClass == "message"){
                $this->alertMailer->$method($entity, $entity->getToUser()->getEmail());
            }
            if($alert->getKey() == "RECEIVED_NEW_BID" && $alert->getValue() == "ON" && $shortNameClass == "bid"){
                $this->alertMailer->$method($entity, $entity->getTender()->getCreatorUser()->getEmail);
            }
        }

    }


    private function executeUpdateAction($user_alerts, $entity){
        if(!$user_alerts){
            return;
        }
        $className = get_class($entity);
        $reflection = new \ReflectionClass($className);
        $shortNameClass =  lcfirst($reflection->getShortName());
        $method = "update_".$shortNameClass;

        foreach ($user_alerts as $alert){
            if($alert->getKey() == "BID_SHORLISTED" && $alert->getValue() == "ON" && $shortNameClass == "bid"){
                $this->alertMailer->$method($entity, $entity->getCreatorUser()->getEmail());
            }
        }
    }

    private function addNotification($entity, EntityManager $entityManager){
        $notification = new Notification();
        $notification->setRead(false);
        $notification->setCreatorUser($entity->getCreatorUser());
        $className = get_class($entity);
        $reflection = new \ReflectionClass($className);
        $shortNameClass =  lcfirst($reflection->getShortName());
        if($shortNameClass == "message"){
            $link = array(
                'front.messages.detail',
                array(
                    'id' => $entity->getId()
                )
            );
            $content = $this->translator->trans('notification.showtender',array(
                '%title%' => $entity->getTitle()
            ));
            $notification->setContent($content);
            $notification->setLink(json_encode($link));

        }
        if($shortNameClass == "bid"){
            $link = array(
                'front.mybids.details',
                array(
                    'id' => $entity->getId()
                )
            );
            $content = $this->translator->trans('notification.showbuyerprofile',array(
                '%title%' => $entity->getTitle()
            ));
            $notification->setContent($content);
            $notification->setLink(json_encode($link));
        }

        $entityManager->persist($notification);
        $entityManager->flush();
    }

}