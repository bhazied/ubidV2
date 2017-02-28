<?php

namespace ContinuousNet\UbidElectricityBundle\AlertListener;

use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\Routing\RouterInterface;
use ContinuousNet\UbidElectricityBundle\Entity\User;

class EmailResponseListener {

    private  $alertMailer;

    private $router;
    
    private $em;

    public function __construct(AlertMailer $_alertMailer, RouterInterface $_router, EntityManager $_em)
    {
        $this->alertMailer = $_alertMailer;

        $this->router = $_router;

        $this->em = $_em;
    }

    public function onKernelController(FilterControllerEvent $event)
    {
        /*if($event->isMasterRequest())
        {
            return;
        }*/
        $controller = $event->getController();
        if(!is_array($controller))
        {
            return;
        }
        $matchedRoute = $this->router->match($event->getRequest()->getPathInfo());
        $method = $event->getRequest()->getMethod();
        if(($matchedRoute["_route"] == 'home_tender')  && strtolower($method) == 'get'){
            $entity = $this->em->getRepository('UbidElectricityBundle:Tender')->find($matchedRoute['id']);
            $this->executeLoadAction(
                $this->getUserAlerts($this->em, $entity->getCreatorUser()),
                $entity
            );
        }
        if(($matchedRoute["_route"] == 'buyer_detail')  && strtolower($method) == 'get'){
            $entity = $this->em->getRepository('UbidElectricityBundle:Buyer')->find($matchedRoute['id']);
            $this->executeLoadAction(
                $this->getUserAlerts($this->em, $entity->getCreatorUser()),
                $entity
            );
        }
        if(($matchedRoute["_route"] == 'supplier_detail')  && strtolower($method) == 'get'){
            $entity = $this->em->getRepository('UbidElectricityBundle:Supplier')->find($matchedRoute['id']);
            $this->executeLoadAction(
                $this->getUserAlerts($this->em, $entity->getCreatorUser()),
                $entity
            );
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

    private function executeLoadAction($user_alerts, $entity){
        if(!$user_alerts){
            return;
        }
        $className = get_class($entity);
        $reflection = new \ReflectionClass($className);
        $shortNameClass =  lcfirst($reflection->getShortName());
        $method = "load_".$shortNameClass;
        foreach ($user_alerts as $alert){
            if($alert->getKey() == "CONSULT_YOUR_OPPORTUNITY" && $alert->getValue() == "ON" && $shortNameClass == "tender") {
                $this->alertMailer->$method($entity, $entity->getCreatorUser()->getEmail());
            }
            if($alert->getKey() == "CONSULT_YOUR_PROFILE" && $alert->getValue() == "ON" && $shortNameClass == "buyer") {
                $this->alertMailer->$method($entity, $entity->getCreatorUser()->getEmail());
            }
            if($alert->getKey() == "CONSULT_YOUR_PROFILE" && $alert->getValue() == "ON" && $shortNameClass == "supplier") {
                $this->alertMailer->$method($entity, $entity->getCreatorUser()->getEmail());
            }
        }
    }
    
}
?>