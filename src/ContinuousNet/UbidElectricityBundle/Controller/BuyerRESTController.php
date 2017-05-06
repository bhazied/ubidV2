<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\Buyer;
use ContinuousNet\UbidElectricityBundle\Form\BuyerType;
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
 * Buyer REST Controller
 * 
 * Manage Buyers 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 REST Controller
 * @package  ContinuousNet\UbidElectricityBundle\Controller
 * @author    Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license  CONTINUOUS NET REGULAR LICENSE
 * @version  Release: 1.0
 * @link    http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see      BuyerRESTController
 * @since      Class available since Release 1.0
 * @access    public
 * @RouteResource("Buyer")
 */
class BuyerRESTController extends BaseRESTController
{
    /**
     * Get a Buyer entity
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function getAction(Buyer $entity)
    {
        $entity = $this->translateEntity($entity);
        $this->createSubDirectory($entity);
        return $entity;
    }

    /**
     * Get all Buyer entities.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param ParamFetcherInterface $paramFetcher
     *
     * @return Response
     *
     * @QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing notes.")
     * @QueryParam(name="limit", requirements="\d+", default="1000", description="How many notes to return.")
     * @QueryParam(name="filter_operators", nullable=true, array=true, description="Filter fields operators.")
     * @QueryParam(name="order_by", nullable=true, array=true, description="Order by fields. Must be an array ie. &order_by[name]=ASC&order_by[description]=DESC")
     * @QueryParam(name="filters", nullable=true, array=true, description="Filter by fields. Must be an array ie. &filters[id]=3")
     */
    public function cgetAction(ParamFetcherInterface $paramFetcher)
    {
        try {
            $this->createSubDirectory(new Buyer());
            $offset = $paramFetcher->get('offset');
            $limit = $paramFetcher->get('limit');
            $filter_operators = $paramFetcher->get('filter_operators') ? $paramFetcher->get('filter_operators') : array();
            $order_by = $paramFetcher->get('order_by') ? $paramFetcher->get('order_by') : array();
            $filters = !is_null($paramFetcher->get('filters')) ? $paramFetcher->get('filters') : array();
            $data = array(
                'inlineCount' => 0,
                'results' => array()
            );
            $em = $this->getDoctrine()->getManager();
            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:Buyer', 'buyer');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\BuyerType', 'buyer_type', \Doctrine\ORM\Query\Expr\Join::WITH, 'buyer.buyerType = buyer_type.id');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\Country', 'country', \Doctrine\ORM\Query\Expr\Join::WITH, 'buyer.country = country.id');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\Language', 'language', \Doctrine\ORM\Query\Expr\Join::WITH, 'buyer.language = language.id');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\Region', 'first_market_region', \Doctrine\ORM\Query\Expr\Join::WITH, 'buyer.firstMarketRegion = first_market_region.id');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\Region', 'second_market_region', \Doctrine\ORM\Query\Expr\Join::WITH, 'buyer.secondMarketRegion = second_market_region.id');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\Region', 'third_market_region', \Doctrine\ORM\Query\Expr\Join::WITH, 'buyer.thirdMarketRegion = third_market_region.id');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\User', 'creator_user', \Doctrine\ORM\Query\Expr\Join::WITH, 'buyer.creatorUser = creator_user.id');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\User', 'modifier_user', \Doctrine\ORM\Query\Expr\Join::WITH, 'buyer.modifierUser = modifier_user.id');
            $textFields = array('buyer.name', 'buyer.description', 'buyer.mainProductsServices', 'buyer.referenceNumber', 'buyer.phone', 'buyer.fax', 'buyer.website', 'buyer.email', 'buyer.firstName', 'buyer.lastName', 'buyer.job', 'buyer.picture', 'buyer.address', 'buyer.zipCode', 'buyer.city', 'buyer.companyName', 'buyer.totalRevenu');
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
                $key = str_replace('.', '', $field);
                if (!empty($value)) {
                   if (in_array($field, $textFields)) {
                       if (isset($filter_operators[$field]) && $filter_operators[$field] == 'eq') {
                           $qb->andWhere($qb->expr()->eq($field, $qb->expr()->literal($value)));
                       } else {
                           $qb->andWhere($qb->expr()->like($field, $qb->expr()->literal('%' . $value . '%')));
                       }
                   } else {
                       $qb->andWhere($field.' = :'.$key.'')->setParameter($key, $value);
                   }
                }
            }
            foreach ($memberOfConditions as $listName => $memberOfCondition) {
                if (!empty($memberOfCondition['items'])) {
                    if ($memberOfCondition['operator'] == 'or') {
                        $orX = $qb->expr()->orX();
                        foreach ($memberOfCondition['items'] as $i => $item) {
                            $orX->add($qb->expr()->isMemberOf(':'.$listName.'_value_'.$i, 'buyer.'.$listName));
                            $qb->setParameter($listName.'_value_'.$i, $item);
                        }
                        $qb->andWhere($orX);
                    } else if ($memberOfCondition['operator'] == 'and') {
                        $andX = $qb->expr()->andX();
                        foreach ($memberOfCondition['items'] as $i => $item) {
                            $andX->add($qb->expr()->isMemberOf(':'.$listName.'_value_'.$i, 'buyer.'.$listName));
                            $qb->setParameter($listName.'_value_'.$i, $item);
                        }
                        $qb->andWhere($andX);
                    }
                }
            }
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                   if (substr_count($role, 'SUB') > 0) {
                       $qb->andWhere('buyer.creatorUser = :creatorUser')->setParameter('creatorUser', $this->getUser()->getId());
                   }
                }
            }
            $qbList = clone $qb;
            $qb->select('count(buyer.id)');
            $data['inlineCount'] = $qb->getQuery()->getSingleScalarResult();
            foreach ($order_by as $field => $direction) {
                $qbList->addOrderBy($field, $direction);
            }
            $qbList->select('buyer');
            $qbList->setMaxResults($limit);
            $qbList->setFirstResult($offset);
            $qbList->groupBy('buyer.id');
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
     * Create a Buyer entity.
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
        $entity = new Buyer();
        $form = $this->createForm(new BuyerType(), $entity, array('method' => $request->getMethod()));
        $this->removeExtraFields($request, $form);
        $form->handleRequest($request);
        if ($form->isValid()) {
            $entity->setCreatorUser($this->getUser());
            $em->persist($entity);
            $em->flush();
            return $entity;
        }
    }

    /**
     * Update a Buyer entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function putAction(Request $request, Buyer $entity)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $request->setMethod('PATCH'); //Treat all PUTs as PATCH
            $previousCategories = $entity->getCategories()->toArray();
            foreach ($previousCategories as $previousCategory) {
                $entity->removeCategory($previousCategory);
            }
            $previousLanguages = $entity->getLanguages()->toArray();
            foreach ($previousLanguages as $previousLanguage) {
                $entity->removeLanguage($previousLanguage);
            }
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                   if (substr_count($role, 'SUB') > 0) {
                       if ($entity->getCreatorUser()->getId() != $this->getUser()->getId()) {
                           return FOSView::create('Not authorized', Codes::HTTP_FORBIDDEN);
                       }
                   }
                }
            }
            $form = $this->createForm(new BuyerType(), $entity, array('method' => $request->getMethod()));
            $this->removeExtraFields($request, $form);
            $form->handleRequest($request);
            if ($form->isValid()) {
                $entity->setModifierUser($this->getUser());
                $em->flush();
                return $entity;
            }
            return FOSView::create(array('errors' => $form->getErrors()), Codes::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Partial Update to a Buyer entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function patchAction(Request $request, Buyer $entity)
    {
        return $this->putAction($request, $entity);
    }

    /**
     * Delete a Buyer entity.
     *
     * @View(statusCode=204)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function deleteAction(Request $request, Buyer $entity)
    {
        try {
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                   if (substr_count($role, 'SUB') > 0) {
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
