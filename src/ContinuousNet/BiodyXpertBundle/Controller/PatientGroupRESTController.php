<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\PatientGroup;
use ContinuousNet\BiodyXpertBundle\Form\PatientGroupType;
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
 * Patient Group REST Controller
 * 
 * Manage PatientGroups 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 REST Controller
 * @package  ContinuousNet\BiodyXpertBundle\Controller
 * @author    Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license  CONTINUOUS NET REGULAR LICENSE
 * @version  Release: 1.0
 * @link    http://biodyxpert.continuousnet.com/ContinuousNet/BiodyXpertBundle/Controller
 * @see      PatientGroupRESTController
 * @since      Class available since Release 1.0
 * @access    public
 * @RouteResource("PatientGroup")
 */
class PatientGroupRESTController extends BaseRESTController
{
    /**
     * Get a Patient Group entity
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function getAction(PatientGroup $entity)
    {
        $entity = $this->translateEntity($entity);
        $this->createSubDirectory($entity);
        return $entity;
    }

    /**
     * Get all Patient Group entities.
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
            $this->createSubDirectory(new PatientGroup());
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
            $qb->from('BiodyXpertBundle:PatientGroup', 'pg_');
            $qb->leftJoin('ContinuousNet\BiodyXpertBundle\Entity\User', 'creator_user', \Doctrine\ORM\Query\Expr\Join::WITH, 'pg_.creatorUser = creator_user.id');
            $qb->leftJoin('ContinuousNet\BiodyXpertBundle\Entity\User', 'modifier_user', \Doctrine\ORM\Query\Expr\Join::WITH, 'pg_.modifierUser = modifier_user.id');
            $textFields = array('patientGroup.name', 'patientGroup.variable', 'patientGroup.color');
            $memberOfConditions = array();
            foreach ($filters as $field => $value) {
                if (substr_count($field, '.') > 1) {
                    if ($value == 'true' || $value == 'or' || $value == 'and') {
                        list ($entityName, $listName, $listItem) = explode('.', $field);
                        if (!isset($memberOfConditions[$listName])) {
                            $memberOfConditions[$listName] = array('items' => array(), 'operator' => 'or');
                        }
                        if ($value == 'or' || $value == 'and') {
                            $memberOfConditions[$listName]['operator'] = $value;
                        } else {
                            $memberOfConditions[$listName]['items'][] = $listItem;
                        }
                    }
                    continue;
                }
                $_field = str_replace('patientGroup.', 'pg_.', $field);
                $key = str_replace('.', '', $field);
                if (!empty($value)) {
                   if (in_array($field, $textFields)) {
                       $qb->andWhere($qb->expr()->like($_field, $qb->expr()->literal('%' . $value . '%')));
                   } else {
                       $qb->andWhere($_field.' = :'.$key.'')->setParameter($key, $value);
                   }
                }
            }
            foreach ($memberOfConditions as $listName => $memberOfCondition) {
                if (!empty($memberOfCondition['items'])) {
                    if ($memberOfCondition['operator'] == 'or') {
                        $orX = $qb->expr()->orX();
                        foreach ($memberOfCondition['items'] as $i => $item) {
                            $orX->add($qb->expr()->isMemberOf(':'.$listName.'_value_'.$i, 'p_.'.$listName));
                            $qb->setParameter($listName.'_value_'.$i, $item);
                        }
                        $qb->andWhere($orX);
                    } else if ($memberOfCondition['operator'] == 'and') {
                        $andX = $qb->expr()->andX();
                        foreach ($memberOfCondition['items'] as $i => $item) {
                            $andX->add($qb->expr()->isMemberOf(':'.$listName.'_value_'.$i, 'p_.'.$listName));
                            $qb->setParameter($listName.'_value_'.$i, $item);
                        }
                        $qb->andWhere($andX);
                    }
                }
            }
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                   if (substr_count($role, 'MAN') > 0) {
                       $qb->andWhere('pg_.creatorUser = :creatorUser OR pg_.shareLevel = :shareLevel')->setParameter('creatorUser', $this->getUser()->getId())->setParameter('shareLevel', 'Everyone');
                   }
                }
            }
            $qbList = clone $qb;
            $qb->select('count(pg_.id)');
            $data['inlineCount'] = $qb->getQuery()->getSingleScalarResult();
            foreach ($order_by as $field => $direction) {
                $field = str_replace('patientGroup.', 'pg_.', $field);
                $qbList->addOrderBy($field, $direction);
            }
            $qbList->select('pg_');
            $qbList->setMaxResults($limit);
            $qbList->setFirstResult($offset);
            $qbList->groupBy('pg_.id');
            $results = $qbList->getQuery()->getResult();
            $results = $this->translateEntities($results);
            if ($results) {
                $data['results'] = $results;
            }
            return $data;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create a Patient Group entity.
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
        $entity = new PatientGroup();
        $form = $this->createForm(new PatientGroupType(), $entity, array('method' => $request->getMethod()));
        $this->removeExtraFields($request, $form);
        $form->handleRequest($request);
        if ($form->isValid()) {
            $entity->setCreatorUser($this->getUser());
            $authorizedChangeVariable = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeVariable = true;
                    }
                }
            }
            if (!$authorizedChangeVariable) {
                $entity->setVariable(null);
            }
            $authorizedChangeShareLevel = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeShareLevel = true;
                    }
                }
            }
            if (!$authorizedChangeShareLevel) {
                $entity->setShareLevel('None');
            }
            $em->persist($entity);
            $em->flush();
            return $entity;
        }
    }

    /**
     * Update a Patient Group entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function putAction(Request $request, PatientGroup $entity)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $request->setMethod('PATCH'); //Treat all PUTs as PATCH
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                   if (substr_count($role, 'MAN') > 0) {
                       if ($entity->getCreatorUser()->getId() != $this->getUser()->getId()) {
                           return FOSView::create('Not authorized', Codes::HTTP_FORBIDDEN);
                       }
                   }
                }
            }
            $form = $this->createForm(new PatientGroupType(), $entity, array('method' => $request->getMethod()));
            $this->removeExtraFields($request, $form);
            $form->handleRequest($request);
            if ($form->isValid()) {
                $entity->setModifierUser($this->getUser());
                $authorizedChangeVariable = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeVariable = true;
                        }
                    }
                }
                $authorizedChangeShareLevel = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeShareLevel = true;
                        }
                    }
                }
                $em->flush();
                return $entity;
            }
            return FOSView::create(array('errors' => $form->getErrors()), Codes::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Partial Update to a Patient Group entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function patchAction(Request $request, PatientGroup $entity)
    {
        return $this->putAction($request, $entity);
    }

    /**
     * Delete a Patient Group entity.
     *
     * @View(statusCode=204)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function deleteAction(Request $request, PatientGroup $entity)
    {
        try {
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                   if (substr_count($role, 'MAN') > 0) {
                       if ($entity->getCreatorUser()->getId() != $this->getUser()->getId()) {
                           return FOSView::create('Not authorized', Codes::HTTP_FORBIDDEN);
                       }
                   }
                }
            }
            $em = $this->getDoctrine()->getManager();
            $em->remove($entity);
            $em->flush();
            return null;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    

}
