<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\Banner;
use ContinuousNet\UbidElectricityBundle\Form\BannerType;
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
 * Banner REST Controller
 * 
 * Manage Banners 
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
 * @see      BannerRESTController
 * @since      Class available since Release 1.0
 * @access    public
 * @RouteResource("Banner")
 */
class BannerRESTController extends BaseRESTController
{
    /**
     * Get a Banner entity
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function getAction(Banner $entity)
    {
        $entity = $this->translateEntity($entity);
        $this->createSubDirectory($entity);
        return $entity;
    }

    /**
     * Get all Banner entities.
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
            $this->createSubDirectory(new Banner());
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
            $qb->from('UbidElectricityBundle:Banner', 'banner');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\BannerType', 'banner_type', \Doctrine\ORM\Query\Expr\Join::WITH, 'banner.bannerType = banner_type.id');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\User', 'creator_user', \Doctrine\ORM\Query\Expr\Join::WITH, 'banner.creatorUser = creator_user.id');
            $qb->leftJoin('ContinuousNet\UbidElectricityBundle\Entity\User', 'modifier_user', \Doctrine\ORM\Query\Expr\Join::WITH, 'banner.modifierUser = modifier_user.id');
            $textFields = array('banner.name', 'banner.picture', 'banner.iphoneAction', 'banner.androidAction', 'banner.webAction', 'banner.webUrl', 'banner.phoneNumberToCall', 'banner.smsMobileNumber', 'banner.smsBody', 'banner.emailAdress', 'banner.emailSubject', 'banner.emailBody', 'banner.androidAppUrl', 'banner.iphoneAppUrl', 'banner.youtubeUrl', 'banner.screen', 'banner.screenParameters', 'banner.template', 'banner.adText', 'banner.textColor', 'banner.backgroundColor');
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
                            $orX->add($qb->expr()->isMemberOf(':'.$listName.'_value_'.$i, 'banner.'.$listName));
                            $qb->setParameter($listName.'_value_'.$i, $item);
                        }
                        $qb->andWhere($orX);
                    } else if ($memberOfCondition['operator'] == 'and') {
                        $andX = $qb->expr()->andX();
                        foreach ($memberOfCondition['items'] as $i => $item) {
                            $andX->add($qb->expr()->isMemberOf(':'.$listName.'_value_'.$i, 'banner.'.$listName));
                            $qb->setParameter($listName.'_value_'.$i, $item);
                        }
                        $qb->andWhere($andX);
                    }
                }
            }
            $qbList = clone $qb;
            $qb->select('count(banner.id)');
            $data['inlineCount'] = $qb->getQuery()->getSingleScalarResult();
            foreach ($order_by as $field => $direction) {
                $qbList->addOrderBy($field, $direction);
            }
            $qbList->select('banner');
            $qbList->setMaxResults($limit);
            $qbList->setFirstResult($offset);
            $qbList->groupBy('banner.id');
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
     * Create a Banner entity.
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
        $entity = new Banner();
        $form = $this->createForm(new BannerType(), $entity, array('method' => $request->getMethod()));
        $this->removeExtraFields($request, $form);
        $form->handleRequest($request);
        if ($form->isValid()) {
            $entity->setCreatorUser($this->getUser());
            $authorizedChangeStatus = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ROLE_ADMIN_PUBLISHER') > 0) {
                        $authorizedChangeStatus = true;
                    }
                }
            }
            if (!$authorizedChangeStatus) {
                $entity->setStatus('Draft');
            }
            $em->persist($entity);
            $em->flush();
            return $entity;
        }
    }

    /**
     * Update a Banner entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function putAction(Request $request, Banner $entity)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $request->setMethod('PATCH'); //Treat all PUTs as PATCH
            $previousBannerPositions = $entity->getBannerPositions()->toArray();
            foreach ($previousBannerPositions as $previousBannerPosition) {
                $entity->removeBannerPosition($previousBannerPosition);
            }
            $form = $this->createForm(new BannerType(), $entity, array('method' => $request->getMethod()));
            $this->removeExtraFields($request, $form);
            $form->handleRequest($request);
            if ($form->isValid()) {
                $entity->setModifierUser($this->getUser());
                $authorizedChangeStatus = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ROLE_ADMIN_PUBLISHER') > 0) {
                            $authorizedChangeStatus = true;
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
     * Partial Update to a Banner entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function patchAction(Request $request, Banner $entity)
    {
        return $this->putAction($request, $entity);
    }

    /**
     * Delete a Banner entity.
     *
     * @View(statusCode=204)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function deleteAction(Request $request, Banner $entity)
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
    

}
