<?php

namespace ContinuousNet\UbidElectricityBundle\EventListener;

use Doctrine\ORM\EntityManager;
use Symfony\Component\Translation\TranslatorInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTManager;

/**
 * UserSessionData
 *
 * @author Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 */
class UserSessionData
{

    protected $em;
    protected $translator;
    protected $jwtManager;

    function __construct(EntityManager $em, TranslatorInterface $translator, JWTManager $jwtManager)
    {
        $this->em = $em;
        $this->translator = $translator;
        $this->jwtManager = $jwtManager;
    }

    public function sessionData($user) {
        $data = array();
        $data['token'] = $this->jwtManager->create($user);
        $data['user'] = $this->userData($user);

        $user->setLoginCount($user->getLoginCount()+1);
        $user->setLastFailedLoginCount(0);
        $this->em->flush();

        return $data;
    }

    public function userData($user) {

        $roles = $user->getRoles();

        $data = array(
            'email' => $user->getEmail(),
            'username' => $user->getUsername(),
            'name' => $user->getFirstName().' '.$user->getLastName(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
            'picture' => $user->getPicture(),
            'job' => $user->getJob(),
            'roles' => $roles
        );

        if (in_array('ROLE_SUBSCRIBER', $roles)) {
            $data['country'] = $user->getCountry()->getId();
            $data['countryName'] = $user->getCountry()->getName();
            $data['phone'] = $user->getPhone();
            $data['gender'] = $user->getGender();
            $data['picture'] = $user->getPicture();
            $data['type'] = $user->getType();

            $qb = $this->em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:Notification', 'n_');
            $qb->select('count(n_.id)');
            $qb->andWhere('n_.read = :read')->setParameter('read', false);
            $qb->andWhere('n_.creatorUser = :user')->setParameter('user', $user->getId());
            $data['notificationsCount'] = $qb->getQuery()->getSingleScalarResult();
        }

        return $data;
    }

}