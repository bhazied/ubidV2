<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\User;
use ContinuousNet\UbidElectricityBundle\Form\UserType;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\Util\Codes;
use FOS\RestBundle\View\View as FOSView;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Finder\Finder;;
use Symfony\Component\Finder\SplFileInfo;
use Voryx\RESTGeneratorBundle\Controller\VoryxController;

/**
 * User REST Controller
 * 
 * Manage Users 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 REST Controller
 * @package  ContinuousNet\UbidElectricityBundle\Controller
 * @author    Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license  CONTINUOUS NET REGULAR LICENSE
 * @version  Release: 1.0
 * @link    http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see      UserRESTController
 * @since      Class available since Release 1.0
 * @access    public
 * @RouteResource("User")
 */
class UserRESTController extends BaseRESTController
{
    /**
     * Get a User entity
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function getAction(User $entity)
    {
        $this->createSubDirectory($entity);
        return $entity;
    }

    /**
     * Get all User entities.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param ParamFetcherInterface $paramFetcher
     *
     * @return Response
     *
     * @QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing notes.")
     * @QueryParam(name="limit", requirements="\d+", default="1000", description="How many notes to return.")
     * @QueryParam(name="order_by", nullable=true, array=true, description="Order by fields. Must be an array ie. &order_by[name]=ASC&order_by[description]=DESC")
     * @QueryParam(name="filters", nullable=true, array=true, description="Filter by fields. Must be an array ie. &filters[id]=3")
     */
    public function cgetAction(ParamFetcherInterface $paramFetcher)
    {
        try {
            $this->createSubDirectory(new User());
            $offset = $paramFetcher->get('offset');
            $limit = $paramFetcher->get('limit');
            $order_by = $paramFetcher->get('order_by') ? $paramFetcher->get('order_by') : array();
            $filters = !is_null($paramFetcher->get('filters')) ? $paramFetcher->get('filters') : array();
            $data = array(
                'inlineCount' => 0,
                'results' => array()
            );
            $em = $this->getDoctrine()->getManager();
            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:User', 'u_');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\Country', 'country', \Doctrine\ORM\Query\Expr\Join::WITH, 'u_.country = country.id');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\Language', 'language', \Doctrine\ORM\Query\Expr\Join::WITH, 'u_.language = language.id');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\User', 'creator_user', \Doctrine\ORM\Query\Expr\Join::WITH, 'u_.creatorUser = creator_user.id');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\User', 'modifier_user', \Doctrine\ORM\Query\Expr\Join::WITH, 'u_.modifierUser = modifier_user.id');
            $textFields = array('user.username', 'user.phone', 'user.email', 'user.usernameCanonical', 'user.emailCanonical', 'user.firstName', 'user.lastName', 'user.picture', 'user.address', 'user.zipCode', 'user.companyName', 'user.job', 'user.profile', 'user.phoneValidationCode', 'user.emailValidationCode', 'user.roles', 'user.confirmationToken');
            foreach ($filters as $field => $value) {
                if (substr_count($field, '.') > 1) {
                    if ($value == 'true') {
                        list ($entityName, $listName, $listItem) = explode('.', $field);
                        $qb->andWhere(':'.$listName.'_value MEMBER OF u_.'.$listName)->setParameter($listName.'_value', $listItem);
                    }
                    continue;
                }
                $_field = str_replace('user.', 'u_.', $field);
                $key = str_replace('.', '', $field);
                if (!empty($value)) {
                   if (in_array($field, $textFields)) {
                       $qb->andWhere($qb->expr()->like($_field, $qb->expr()->literal('%' . $value . '%')));
                   } else {
                       $qb->andWhere($_field.' = :'.$key.'')->setParameter($key, $value);
                   }
                }
            }
            $qbList = clone $qb;
            $qb->select('count(u_.id)');
            $data['inlineCount'] = $qb->getQuery()->getSingleScalarResult();
            foreach ($order_by as $field => $direction) {
                $field = str_replace('user.', 'u_.', $field);
                $qbList->addOrderBy($field, $direction);
            }
            $qbList->select('u_');
            $qbList->setMaxResults($limit);
            $qbList->setFirstResult($offset);
            $qbList->groupBy('u_.id');
            $results = $qbList->getQuery()->getResult();
            if ($results) {
                $data['results'] = $results;
            }
            return $data;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create a User entity.
     *
     * @View(statusCode=201, serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     *
     * @return Response
     *
     */
    public function postAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $entity = new User();
        $form = $this->createForm(new UserType(), $entity, array('method' => $request->getMethod()));
        $this->removeExtraFields($request, $form);
        $form->handleRequest($request);
        if ($form->isValid()) {
            $entity->setCreatorUser($this->getUser());
            $authorizedChangeEnabled = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ROLE_SUPER_ADMIN') > 0) {
                        $authorizedChangeEnabled = true;
                    }
                }
            }
            if (!$authorizedChangeEnabled) {
                $entity->setEnabled(false);
            }
            $authorizedChangeConfirmationToken = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'SYSTEM') > 0) {
                        $authorizedChangeConfirmationToken = true;
                    }
                }
            }
            if (!$authorizedChangeConfirmationToken) {
                $entity->setConfirmationToken(null);
            }
            $authorizedChangePasswordRequestedAt = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'SYSTEM') > 0) {
                        $authorizedChangePasswordRequestedAt = true;
                    }
                }
            }
            if (!$authorizedChangePasswordRequestedAt) {
                $entity->setPasswordRequestedAt(null);
            }
            $authorizedChangeLocked = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ROLE_SUPER_ADMIN') > 0) {
                        $authorizedChangeLocked = true;
                    }
                }
            }
            if (!$authorizedChangeLocked) {
                $entity->setLocked(false);
            }
            $authorizedChangeExpired = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ROLE_SUPER_ADMIN') > 0) {
                        $authorizedChangeExpired = true;
                    }
                }
            }
            if (!$authorizedChangeExpired) {
                $entity->setExpired(false);
            }
            $authorizedChangeExpiresAt = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'SYSTEM') > 0) {
                        $authorizedChangeExpiresAt = true;
                    }
                }
            }
            if (!$authorizedChangeExpiresAt) {
                $entity->setExpiresAt(null);
            }
            $authorizedChangeCredentialsExpireAt = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'SYSTEM') > 0) {
                        $authorizedChangeCredentialsExpireAt = true;
                    }
                }
            }
            if (!$authorizedChangeCredentialsExpireAt) {
                $entity->setCredentialsExpireAt(null);
            }
            $authorizedChangeLastLogin = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'SYSTEM') > 0) {
                        $authorizedChangeLastLogin = true;
                    }
                }
            }
            if (!$authorizedChangeLastLogin) {
                $entity->setLastLogin(null);
            }
            $authorizedChangeLastFailedLogin = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'SYSTEM') > 0) {
                        $authorizedChangeLastFailedLogin = true;
                    }
                }
            }
            if (!$authorizedChangeLastFailedLogin) {
                $entity->setLastFailedLogin(null);
            }
            $authorizedChangeLoginCount = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'SYSTEM') > 0) {
                        $authorizedChangeLoginCount = true;
                    }
                }
            }
            if (!$authorizedChangeLoginCount) {
                $entity->setLoginCount(null);
            }
            $authorizedChangeFailedLoginCount = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'SYSTEM') > 0) {
                        $authorizedChangeFailedLoginCount = true;
                    }
                }
            }
            if (!$authorizedChangeFailedLoginCount) {
                $entity->setFailedLoginCount(null);
            }
            $authorizedChangeLastFailedLoginCount = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'SYSTEM') > 0) {
                        $authorizedChangeLastFailedLoginCount = true;
                    }
                }
            }
            if (!$authorizedChangeLastFailedLoginCount) {
                $entity->setLastFailedLoginCount(null);
            }
            $entity = $this->process($entity, true);
            $em->persist($entity);
            $em->flush();
            return $entity;
        }
    }

    /**
     * Update a User entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function putAction(Request $request, User $entity)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $request->setMethod('PATCH'); //Treat all PUTs as PATCH
            $entity->setRoles(array());
            $previousGroups = $entity->getGroups()->toArray();
            foreach ($previousGroups as $previousGroup) {
                $entity->removeGroup($previousGroup);
            }
            $form = $this->createForm(new UserType(), $entity, array('method' => $request->getMethod()));
            $this->removeExtraFields($request, $form);
            $form->handleRequest($request);
            if ($form->isValid()) {
                $entity->setModifierUser($this->getUser());
                $authorizedChangeEnabled = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ROLE_SUPER_ADMIN') > 0) {
                            $authorizedChangeEnabled = true;
                        }
                    }
                }
                $authorizedChangeConfirmationToken = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'SYSTEM') > 0) {
                            $authorizedChangeConfirmationToken = true;
                        }
                    }
                }
                $authorizedChangePasswordRequestedAt = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'SYSTEM') > 0) {
                            $authorizedChangePasswordRequestedAt = true;
                        }
                    }
                }
                $authorizedChangeLocked = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ROLE_SUPER_ADMIN') > 0) {
                            $authorizedChangeLocked = true;
                        }
                    }
                }
                $authorizedChangeExpired = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ROLE_SUPER_ADMIN') > 0) {
                            $authorizedChangeExpired = true;
                        }
                    }
                }
                $authorizedChangeExpiresAt = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'SYSTEM') > 0) {
                            $authorizedChangeExpiresAt = true;
                        }
                    }
                }
                $authorizedChangeCredentialsExpireAt = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'SYSTEM') > 0) {
                            $authorizedChangeCredentialsExpireAt = true;
                        }
                    }
                }
                $authorizedChangeLastLogin = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'SYSTEM') > 0) {
                            $authorizedChangeLastLogin = true;
                        }
                    }
                }
                $authorizedChangeLastFailedLogin = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'SYSTEM') > 0) {
                            $authorizedChangeLastFailedLogin = true;
                        }
                    }
                }
                $authorizedChangeLoginCount = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'SYSTEM') > 0) {
                            $authorizedChangeLoginCount = true;
                        }
                    }
                }
                $authorizedChangeFailedLoginCount = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'SYSTEM') > 0) {
                            $authorizedChangeFailedLoginCount = true;
                        }
                    }
                }
                $authorizedChangeLastFailedLoginCount = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'SYSTEM') > 0) {
                            $authorizedChangeLastFailedLoginCount = true;
                        }
                    }
                }
                $entity = $this->process($entity, false);
                $em->flush();
                return $entity;
            }
            return FOSView::create(array('errors' => $form->getErrors()), Codes::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Partial Update to a User entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function patchAction(Request $request, User $entity)
    {
        return $this->putAction($request, $entity);
    }

    /**
     * Delete a User entity.
     *
     * @View(statusCode=204)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function deleteAction(Request $request, User $entity)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $em->remove($entity);
            $em->flush();
            return null;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    
    private function process(User $entity, $isNew)
    {
        if (is_null($entity->getSalt()) || empty($entity->getSalt())) {
            $entity->setSalt(base_convert(sha1(uniqid(mt_rand(), true)), 16, 36));
        }
        if (is_null($entity->getRoles()) || empty($entity->getRoles())) {
            $entity->setRoles(array('ROLE_API', 'ROLE_SUBSCRIBER'));
        }
        $entity->setUsername($entity->getEmail());
        $entity->setUsernameCanonical(strtolower($entity->getEmail()));
        $entity->setEmailCanonical(strtolower($entity->getEmail()));
        if ($isNew || strlen($entity->getPassword()) != 88) {
            $entity->setPlainPassword($entity->getPassword());
        }
        return $entity;
    }


}
