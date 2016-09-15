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
            'roles' => $roles
        );

        if (in_array('ROLE_SUBSCRIBER', $roles)) {

            $data['gender'] = $user->getGender();
            $data['country'] = $user->getCountry()->getId();
            $data['countryName'] = $user->getCountry()->getName();
            $data['phone'] = $user->getPhone();

        } else {

            $data['job'] = $user->getJob();
            $data['picture'] = $user->getPicture();

        }

        return $data;
    }

}