<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\Tender;
use ContinuousNet\UbidElectricityBundle\Form\TenderType;
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
 * Tender REST Controller
 * 
 * Manage Tenders 
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
 * @see      TenderRESTController
 * @since      Class available since Release 1.0
 * @access    public
 * @RouteResource("Tender")
 */
class TenderRESTController extends BaseRESTController
{
    /**
     * Get a Tender entity
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function getAction(Tender $entity)
    {
        $entity->dir = $this->getSubDirectory($entity, false);
        $this->createSubDirectory($entity);
        return $entity;
    }

    /**
     * Get all Tender entities.
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
            $qb->from('UbidElectricityBundle:Tender', 't_');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\Buyer', 'buyer', \Doctrine\ORM\Query\Expr\Join::WITH, 't_.buyer = buyer.id');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\Region', 'region', \Doctrine\ORM\Query\Expr\Join::WITH, 't_.region = region.id');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\Country', 'country', \Doctrine\ORM\Query\Expr\Join::WITH, 't_.country = country.id');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\Sector', 'sector', \Doctrine\ORM\Query\Expr\Join::WITH, 't_.sector = sector.id');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\TenderType', 'tender_type', \Doctrine\ORM\Query\Expr\Join::WITH, 't_.tenderType = tender_type.id');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\BiddingType', 'bidding_type', \Doctrine\ORM\Query\Expr\Join::WITH, 't_.biddingType = bidding_type.id');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\User', 'creator_user', \Doctrine\ORM\Query\Expr\Join::WITH, 't_.creatorUser = creator_user.id');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\User', 'modifier_user', \Doctrine\ORM\Query\Expr\Join::WITH, 't_.modifierUser = modifier_user.id');
            $textFields = array('tender.title', 'tender.slug', 'tender.reference', 'tender.description', 'tender.address', 'tender.email', 'tender.phone', 'tender.attachmentFiles', 'tender.source');
            foreach ($filters as $field => $value) {
                if (substr_count($field, '.') > 1) {
                    if ($value == 'true') {
                        list ($entityName, $listName, $listItem) = explode('.', $field);
                        $qb->andWhere(':'.$listName.'_value MEMBER OF t_.'.$listName)->setParameter($listName.'_value', $listItem);
                    }
                    continue;
                }
                $_field = str_replace('tender.', 't_.', $field);
                $key = str_replace('.', '', $field);
                if (!empty($value)) {
                   if (in_array($field, $textFields)) {
                       $qb->andWhere($qb->expr()->like($_field, $qb->expr()->literal('%' . $value . '%')));
                   } else {
                       $qb->andWhere($_field.' = :'.$key.'')->setParameter($key, $value);
                   }
                }
            }
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                   if (substr_count($role, 'SUB') > 0) {
                       $qb->andWhere('t_.creatorUser = :creatorUser')->setParameter('creatorUser', $this->getUser()->getId());
                   }
                }
            }
            $qbList = clone $qb;
            $qb->select('count(t_.id)');
            $data['inlineCount'] = $qb->getQuery()->getSingleScalarResult();
            foreach ($order_by as $field => $direction) {
                $field = str_replace('tender.', 't_.', $field);
                $qbList->addOrderBy($field, $direction);
            }
            $qbList->select('t_');
            $qbList->setMaxResults($limit);
            $qbList->setFirstResult($offset);
            $qbList->groupBy('t_.id');
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
     * Create a Tender entity.
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
        $entity = new Tender();
        $form = $this->createForm(new TenderType(), $entity, array('method' => $request->getMethod()));
        $this->removeExtraFields($request, $form);
        $form->handleRequest($request);
        if ($form->isValid()) {
            $entity->setCreatorUser($this->getUser());
            $authorizedChangeSection = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeSection = true;
                    }
                }
            }
            if (!$authorizedChangeSection) {
                $entity->setSection('Consultation');
            }
            $authorizedChangeSource = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeSource = true;
                    }
                }
            }
            if (!$authorizedChangeSource) {
                $entity->setSource(null);
            }
            $authorizedChangeValidated = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeValidated = true;
                    }
                }
            }
            if (!$authorizedChangeValidated) {
                $entity->setValidated(false);
            }
            $em->persist($entity);
            $em->flush();
            return $entity;
        }
    }

    /**
     * Update a Tender entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function putAction(Request $request, Tender $entity)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $request->setMethod('PATCH'); //Treat all PUTs as PATCH
            $previousCategories = $entity->getCategories()->toArray();
            foreach ($previousCategories as $previousCategory) {
                $entity->removeCategory($previousCategory);
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
            $form = $this->createForm(new TenderType(), $entity, array('method' => $request->getMethod()));
            $this->removeExtraFields($request, $form);
            $form->handleRequest($request);
            if ($form->isValid()) {
                $entity->setModifierUser($this->getUser());
                $authorizedChangeSection = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeSection = true;
                        }
                    }
                }
                $authorizedChangeSource = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeSource = true;
                        }
                    }
                }
                $authorizedChangeValidated = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeValidated = true;
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
     * Partial Update to a Tender entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function patchAction(Request $request, Tender $entity)
    {
        return $this->putAction($request, $entity);
    }

    /**
     * Delete a Tender entity.
     *
     * @View(statusCode=204)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function deleteAction(Request $request, Tender $entity)
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
