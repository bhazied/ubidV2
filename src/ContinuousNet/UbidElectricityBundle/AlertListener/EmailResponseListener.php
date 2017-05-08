<?php

namespace ContinuousNet\UbidElectricityBundle\AlertListener;

use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\Routing\RouterInterface;
use ContinuousNet\UbidElectricityBundle\Entity\User;
use ContinuousNet\UbidElectricityBundle\Entity\Notification;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\Translation\TranslatorInterface;

class EmailResponseListener {

    private  $alertMailer;
    private $router;
    private $em;
    private $translator;
    private $tokenStorage;

    public function __construct(AlertMailer $_alertMailer, RouterInterface $_router, EntityManager $_em, TranslatorInterface $_translator, TokenStorage $_tokenStorage) {
        $this->alertMailer = $_alertMailer;
        $this->router = $_router;
        $this->em = $_em;
        $this->translator = $_translator;
        $this->tokenStorage = $_tokenStorage;
    }

    public function onKernelRequest(FilterControllerEvent $event) {

        $matchedRoute = $this->router->match($event->getRequest()->getPathInfo());
        $method = $event->getRequest()->getMethod();

        if (($matchedRoute['_route'] == 'get_tender')  && strtolower($method) == 'get') {
            $entity = $this->em->getRepository('UbidElectricityBundle:Tender')->find($matchedRoute['entity']);
            if (is_object($this->tokenStorage->getToken())) {
                $user = $this->tokenStorage->getToken()->getUser();
                if ($entity->getCreatorUser()->getId() != $user->getId()) {
                    $this->executeLoadAction(
                        $this->getUserAlerts($this->em, $entity->getCreatorUser()),
                        $entity
                    );
                    $this->addNotification($entity);
                }
            }
        }

        if (($matchedRoute['_route'] == 'get_buyer')  && strtolower($method) == 'get') {
            $entity = $this->em->getRepository('UbidElectricityBundle:Buyer')->find($matchedRoute['entity']);
            if (is_object($this->tokenStorage->getToken())) {
                $user = $this->tokenStorage->getToken()->getUser();
                if ($entity->getCreatorUser()->getId() != $user->getId()) {
                    $this->executeLoadAction(
                        $this->getUserAlerts($this->em, $entity->getCreatorUser()),
                        $entity
                    );
                    $this->addNotification($entity);
                }
            }
        }

        if (($matchedRoute['_route'] == 'get_supplier')  && strtolower($method) == 'get') {
            $entity = $this->em->getRepository('UbidElectricityBundle:Supplier')->find($matchedRoute['entity']);
            if (is_object($this->tokenStorage->getToken())) {
                $user = $this->tokenStorage->getToken()->getUser();
                if ($entity->getCreatorUser()->getId() != $user->getId()) {
                    $this->executeLoadAction(
                        $this->getUserAlerts($this->em, $entity->getCreatorUser()),
                        $entity
                    );
                    $this->addNotification($entity);
                }

            }
        }

    }
    
    private function getUserAlerts(EntityManager $entityManager, User $user) {
        $qb = $entityManager->createQueryBuilder();
        $qb->from('UbidElectricityBundle:UserSetting', 'us_');
        $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\User', 'creator_user', \Doctrine\ORM\Query\Expr\Join::WITH, 'us_.creatorUser = creator_user.id');
        $qb->where('us_.creatorUser = :user')->setParameter('user', $user);
        $qb->select('us_');
        $user_alerts = $qb->getQuery()->getResult();
        if ($user_alerts) {
            return $user_alerts;
        }
        return false;
    }

    private function executeLoadAction($user_alerts, $entity) {
        if (!$user_alerts) {
            return;
        }
        $className = get_class($entity);
        $reflection = new \ReflectionClass($className);
        $shortNameClass =  lcfirst($reflection->getShortName());
        $method = 'load_'.$shortNameClass;
        foreach ($user_alerts as $alert) {
            if ($alert->getKey() == 'CONSULT_YOUR_OPPORTUNITY' && $alert->getValue() == 'ON' && $shortNameClass == 'tender') {
                $this->alertMailer->$method($entity, $entity->getCreatorUser()->getEmail());
            }
            if ($alert->getKey() == 'CONSULT_YOUR_PROFILE' && $alert->getValue() == 'ON' && $shortNameClass == 'buyer') {
                $this->alertMailer->$method($entity, $entity->getCreatorUser()->getEmail());
            }
            if ($alert->getKey() == 'CONSULT_YOUR_PROFILE' && $alert->getValue() == 'ON' && $shortNameClass == 'supplier') {
                $this->alertMailer->$method($entity, $entity->getCreatorUser()->getEmail());
            }
        }
    }

    private function addNotification($entity) {
        $notification = new Notification();
        $notification->setRead(false);
        $notification->setCreatorUser($entity->getCreatorUser());
        $className = get_class($entity);
        $reflection = new \ReflectionClass($className);
        $shortNameClass =  lcfirst($reflection->getShortName());
        if ($shortNameClass == 'tender') {
            $link = array(
                'front.tender',
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
        if ($shortNameClass == 'buyer') {
            $link = array(
                'front.buyer',
                array(
                    'id' => $entity->getId()
                )
            );
            $content = $this->translator->trans('notification.showbuyerprofile',array(
                '%title%' => $entity->getName()
            ));
            $notification->setContent($content);
            $notification->setLink(json_encode($link));
        }
        if ($shortNameClass == 'supplier') {
            $link = array(
                'front.supplier',
                array(
                    'id' => $entity->getId()
                )
            );
            $content = $this->translator->trans('notification.showbuyerprofile',array(
                '%title%' => $entity->getName()
            ));
            $notification->setContent($content);
            $notification->setLink(json_encode($link));
        }
        $this->em->persist($notification);
        $this->em->flush();
    }
    
}
