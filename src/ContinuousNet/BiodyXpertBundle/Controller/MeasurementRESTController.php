<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\Measurement;
use ContinuousNet\BiodyXpertBundle\Form\MeasurementType;
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
 * Measurement REST Controller
 * 
 * Manage Measurements 
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
 * @see      MeasurementRESTController
 * @since      Class available since Release 1.0
 * @access    public
 * @RouteResource("Measurement")
 */
class MeasurementRESTController extends BaseRESTController
{
    /**
     * Get a Measurement entity
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function getAction(Measurement $entity)
    {
        $this->createSubDirectory($entity);
        return $entity;
    }

    /**
     * Get all Measurement entities.
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
            $this->createSubDirectory(new Measurement());
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
            $qb->from('BiodyXpertBundle:Measurement', 'm_');
            $qb->leftJoin('ContinuousNet\BiodyXpertBundle\Entity\Patient', 'patient', \Doctrine\ORM\Query\Expr\Join::WITH, 'm_.patient = patient.id');
            $qb->leftJoin('ContinuousNet\BiodyXpertBundle\Entity\PhysicalActivity', 'physical_activity', \Doctrine\ORM\Query\Expr\Join::WITH, 'm_.physicalActivity = physical_activity.id');
            $qb->leftJoin('ContinuousNet\BiodyXpertBundle\Entity\User', 'creator_user', \Doctrine\ORM\Query\Expr\Join::WITH, 'm_.creatorUser = creator_user.id');
            $qb->leftJoin('ContinuousNet\BiodyXpertBundle\Entity\User', 'modifier_user', \Doctrine\ORM\Query\Expr\Join::WITH, 'm_.modifierUser = modifier_user.id');
            $textFields = array('measurement.burstIdentifier', 'measurement.burstGroup', 'measurement.appName', 'measurement.appVersion', 'measurement.dataReceived', 'measurement.fmHcPcZaMaxColor', 'measurement.fmHcPcZbMaxColor', 'measurement.fmHcPcZcMaxColor', 'measurement.fmHcPcZdMaxColor', 'measurement.fmHcPcZeMaxColor', 'measurement.fmHcPcZfMaxColor', 'measurement.ffwPcZaMaxColor', 'measurement.ffwPcZbMaxColor', 'measurement.ffwPcZcMaxColor', 'measurement.ffwPcZdMaxColor', 'measurement.ffwPcZeMaxColor', 'measurement.ffwPcZfMaxColor', 'measurement.ffwPcZgMaxColor', 'measurement.mmhiZaMaxColor', 'measurement.mmhiZbMaxColor', 'measurement.mmhiZcMaxColor', 'measurement.mmhiZdMaxColor', 'measurement.adcrZaMaxColor', 'measurement.adcrZbMaxColor', 'measurement.adcrZcMaxColor', 'measurement.adcrZdMaxColor', 'measurement.adcrZeMaxColor', 'measurement.asmmiZaMaxColor', 'measurement.asmmiZbMaxColor', 'measurement.asmmiZcMaxColor', 'measurement.asmmiZdMaxColor', 'measurement.ecwPcZaMaxColor', 'measurement.ecwPcZbMaxColor', 'measurement.ecwPcZcMaxColor', 'measurement.ecwPcZdMaxColor', 'measurement.ecwPcZeMaxColor', 'measurement.ecwPcZfMaxColor', 'measurement.ecwPcZgMaxColor', 'measurement.icwPcZaMaxColor', 'measurement.icwPcZbMaxColor', 'measurement.icwPcZcMaxColor', 'measurement.icwPcZdMaxColor', 'measurement.icwPcZeMaxColor', 'measurement.icwPcZfMaxColor', 'measurement.icwPcZgMaxColor', 'measurement.fmPcZaMaxColor', 'measurement.fmPcZbMaxColor', 'measurement.fmPcZcMaxColor', 'measurement.fmPcZdMaxColor', 'measurement.fmPcZeMaxColor', 'measurement.fmPcZfMaxColor', 'measurement.tbwffmPcZaMaxColor', 'measurement.tbwffmPcZbMaxColor', 'measurement.tbwffmPcZcMaxColor', 'measurement.tbwffmPcZdMaxColor', 'measurement.tbwffmPcZeMaxColor', 'measurement.tbwffmPcZfMaxColor', 'measurement.tbwffmPcZgMaxColor', 'measurement.dffmiZaMaxColor', 'measurement.dffmiZbMaxColor', 'measurement.dffmiZcMaxColor', 'measurement.dffmiZdMaxColor', 'measurement.mpMetaiZaMaxColor', 'measurement.mpMetaiZbMaxColor', 'measurement.mpMetaiZcMaxColor', 'measurement.mpMetaiZdMaxColor', 'measurement.iffmiZaMaxColor', 'measurement.iffmiZbMaxColor', 'measurement.iffmiZcMaxColor', 'measurement.iffmiZdMaxColor', 'measurement.bmriZaMaxColor', 'measurement.bmriZbMaxColor', 'measurement.bmriZcMaxColor', 'measurement.bmriZdMaxColor', 'measurement.ffecwPcZaMaxColor', 'measurement.ffecwPcZbMaxColor', 'measurement.ffecwPcZcMaxColor', 'measurement.ffecwPcZdMaxColor', 'measurement.ffecwPcZeMaxColor', 'measurement.ffecwPcZfMaxColor', 'measurement.ffecwPcZgMaxColor', 'measurement.fficwPcZaMaxColor', 'measurement.fficwPcZbMaxColor', 'measurement.fficwPcZcMaxColor', 'measurement.fficwPcZdMaxColor', 'measurement.fficwPcZeMaxColor', 'measurement.fficwPcZfMaxColor', 'measurement.fficwPcZgMaxColor', 'measurement.asmhiZaMaxColor', 'measurement.asmhiZbMaxColor', 'measurement.asmhiZcMaxColor', 'measurement.asmhiZdMaxColor', 'measurement.bcmiZaMaxColor', 'measurement.bcmiZbMaxColor', 'measurement.bcmiZcMaxColor', 'measurement.bcmiZdMaxColor', 'measurement.imcZaMaxColor', 'measurement.imcZbMaxColor', 'measurement.imcZcMaxColor', 'measurement.imcZdMaxColor', 'measurement.imcZeMaxColor', 'measurement.imcZfMaxColor', 'measurement.imcZgMaxColor', 'measurement.fmslmirZaMaxColor', 'measurement.fmslmirZbMaxColor', 'measurement.fmirZaMaxColor', 'measurement.fmirZbMaxColor', 'measurement.slmirZaMaxColor', 'measurement.slmirZbMaxColor', 'measurement.whrZaMaxColor', 'measurement.whrZbMaxColor', 'measurement.whtrZaMaxColor', 'measurement.whtrZbMaxColor', 'measurement.totalCcScZaMaxColor', 'measurement.totalCcScZbMaxColor', 'measurement.totalCcScZcMaxColor', 'measurement.totalMuhScZaMaxColor', 'measurement.totalMuhScZbMaxColor', 'measurement.totalMuhScZcMaxColor', 'measurement.cibleZaColor', 'measurement.cibleZbColor', 'measurement.cibleZcColor', 'measurement.cibleZdColor', 'measurement.cibleZeColor', 'measurement.cibleZfColor', 'measurement.asmliColor', 'measurement.asmtliColor', 'measurement.request', 'measurement.response');
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
                $_field = str_replace('measurement.', 'm_.', $field);
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
                   if (substr_count($role, 'ACC') > 0) {
                       $qb->andWhere('m_.creatorUser = :creatorUser')->setParameter('creatorUser', $this->getUser()->getId());
                   }
                }
            }
            $qbList = clone $qb;
            $qb->select('count(m_.id)');
            $data['inlineCount'] = $qb->getQuery()->getSingleScalarResult();
            foreach ($order_by as $field => $direction) {
                $field = str_replace('measurement.', 'm_.', $field);
                $qbList->addOrderBy($field, $direction);
            }
            $qbList->select('m_');
            $qbList->setMaxResults($limit);
            $qbList->setFirstResult($offset);
            $qbList->groupBy('m_.id');
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
     * Create a Measurement entity.
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
        $entity = new Measurement();
        $form = $this->createForm(new MeasurementType(), $entity, array('method' => $request->getMethod()));
        $this->removeExtraFields($request, $form);
        $form->handleRequest($request);
        if ($form->isValid()) {
            $entity->setCreatorUser($this->getUser());
            $authorizedChangeDeviceDate = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeDeviceDate = true;
                    }
                }
            }
            if (!$authorizedChangeDeviceDate) {
                $entity->setDeviceDate(null);
            }
            $authorizedChangeBatteryLevel = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBatteryLevel = true;
                    }
                }
            }
            if (!$authorizedChangeBatteryLevel) {
                $entity->setBatteryLevel(null);
            }
            $authorizedChangeA5 = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeA5 = true;
                    }
                }
            }
            if (!$authorizedChangeA5) {
                $entity->setA5(null);
            }
            $authorizedChangeA20 = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeA20 = true;
                    }
                }
            }
            if (!$authorizedChangeA20) {
                $entity->setA20(null);
            }
            $authorizedChangeA50 = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeA50 = true;
                    }
                }
            }
            if (!$authorizedChangeA50) {
                $entity->setA50(null);
            }
            $authorizedChangeA100 = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeA100 = true;
                    }
                }
            }
            if (!$authorizedChangeA100) {
                $entity->setA100(null);
            }
            $authorizedChangeA200 = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeA200 = true;
                    }
                }
            }
            if (!$authorizedChangeA200) {
                $entity->setA200(null);
            }
            $authorizedChangeAct = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAct = true;
                    }
                }
            }
            if (!$authorizedChangeAct) {
                $entity->setAct(null);
            }
            $authorizedChangeK = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeK = true;
                    }
                }
            }
            if (!$authorizedChangeK) {
                $entity->setK(null);
            }
            $authorizedChangeEcwPcRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcRef = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcRef) {
                $entity->setEcwPcRef(null);
            }
            $authorizedChangeIcwPcRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcRef = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcRef) {
                $entity->setIcwPcRef(null);
            }
            $authorizedChangeSmiRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeSmiRef = true;
                    }
                }
            }
            if (!$authorizedChangeSmiRef) {
                $entity->setSmiRef(null);
            }
            $authorizedChangeFmirCcRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmirCcRef = true;
                    }
                }
            }
            if (!$authorizedChangeFmirCcRef) {
                $entity->setFmirCcRef(null);
            }
            $authorizedChangeFmirMuhRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmirMuhRef = true;
                    }
                }
            }
            if (!$authorizedChangeFmirMuhRef) {
                $entity->setFmirMuhRef(null);
            }
            $authorizedChangeFmslmirMuhRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmslmirMuhRef = true;
                    }
                }
            }
            if (!$authorizedChangeFmslmirMuhRef) {
                $entity->setFmslmirMuhRef(null);
            }
            $authorizedChangeFmslmirCcRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmslmirCcRef = true;
                    }
                }
            }
            if (!$authorizedChangeFmslmirCcRef) {
                $entity->setFmslmirCcRef(null);
            }
            $authorizedChangeSlmirMuhRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeSlmirMuhRef = true;
                    }
                }
            }
            if (!$authorizedChangeSlmirMuhRef) {
                $entity->setSlmirMuhRef(null);
            }
            $authorizedChangeSlmirCcRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeSlmirCcRef = true;
                    }
                }
            }
            if (!$authorizedChangeSlmirCcRef) {
                $entity->setSlmirCcRef(null);
            }
            $authorizedChangeWhrRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeWhrRef = true;
                    }
                }
            }
            if (!$authorizedChangeWhrRef) {
                $entity->setWhrRef(null);
            }
            $authorizedChangeHac = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeHac = true;
                    }
                }
            }
            if (!$authorizedChangeHac) {
                $entity->setHac(null);
            }
            $authorizedChangeWac = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeWac = true;
                    }
                }
            }
            if (!$authorizedChangeWac) {
                $entity->setWac(null);
            }
            $authorizedChangeA50Radian = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeA50Radian = true;
                    }
                }
            }
            if (!$authorizedChangeA50Radian) {
                $entity->setA50Radian(null);
            }
            $authorizedChangeX50 = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeX50 = true;
                    }
                }
            }
            if (!$authorizedChangeX50) {
                $entity->setX50(null);
            }
            $authorizedChangeR50 = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeR50 = true;
                    }
                }
            }
            if (!$authorizedChangeR50) {
                $entity->setR50(null);
            }
            $authorizedChangeBmrRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmrRef = true;
                    }
                }
            }
            if (!$authorizedChangeBmrRef) {
                $entity->setBmrRef(null);
            }
            $authorizedChangeImc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImc = true;
                    }
                }
            }
            if (!$authorizedChangeImc) {
                $entity->setImc(null);
            }
            $authorizedChangeImcRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcRef = true;
                    }
                }
            }
            if (!$authorizedChangeImcRef) {
                $entity->setImcRef(null);
            }
            $authorizedChangeImcRefInf = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcRefInf = true;
                    }
                }
            }
            if (!$authorizedChangeImcRefInf) {
                $entity->setImcRefInf(null);
            }
            $authorizedChangeImcRefSup = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcRefSup = true;
                    }
                }
            }
            if (!$authorizedChangeImcRefSup) {
                $entity->setImcRefSup(null);
            }
            $authorizedChangeFmPcRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcRef = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcRef) {
                $entity->setFmPcRef(null);
            }
            $authorizedChangeTbw = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbw = true;
                    }
                }
            }
            if (!$authorizedChangeTbw) {
                $entity->setTbw(null);
            }
            $authorizedChangeEcw = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcw = true;
                    }
                }
            }
            if (!$authorizedChangeEcw) {
                $entity->setEcw(null);
            }
            $authorizedChangeBmci = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmci = true;
                    }
                }
            }
            if (!$authorizedChangeBmci) {
                $entity->setBmci(null);
            }
            $authorizedChangeFmHcRefKg = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcRefKg = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcRefKg) {
                $entity->setFmHcRefKg(null);
            }
            $authorizedChangeFmRefKg = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmRefKg = true;
                    }
                }
            }
            if (!$authorizedChangeFmRefKg) {
                $entity->setFmRefKg(null);
            }
            $authorizedChangeFfmKg = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfmKg = true;
                    }
                }
            }
            if (!$authorizedChangeFfmKg) {
                $entity->setFfmKg(null);
            }
            $authorizedChangeFmKg = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmKg = true;
                    }
                }
            }
            if (!$authorizedChangeFmKg) {
                $entity->setFmKg(null);
            }
            $authorizedChangeFfmPc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfmPc = true;
                    }
                }
            }
            if (!$authorizedChangeFfmPc) {
                $entity->setFfmPc(null);
            }
            $authorizedChangeDffmKg = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeDffmKg = true;
                    }
                }
            }
            if (!$authorizedChangeDffmKg) {
                $entity->setDffmKg(null);
            }
            $authorizedChangeDffmRefKg = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeDffmRefKg = true;
                    }
                }
            }
            if (!$authorizedChangeDffmRefKg) {
                $entity->setDffmRefKg(null);
            }
            $authorizedChangeDffmEtKg = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeDffmEtKg = true;
                    }
                }
            }
            if (!$authorizedChangeDffmEtKg) {
                $entity->setDffmEtKg(null);
            }
            $authorizedChangeAsmmKg = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmmKg = true;
                    }
                }
            }
            if (!$authorizedChangeAsmmKg) {
                $entity->setAsmmKg(null);
            }
            $authorizedChangeAsmmRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmmRef = true;
                    }
                }
            }
            if (!$authorizedChangeAsmmRef) {
                $entity->setAsmmRef(null);
            }
            $authorizedChangeAsmmEt = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmmEt = true;
                    }
                }
            }
            if (!$authorizedChangeAsmmEt) {
                $entity->setAsmmEt(null);
            }
            $authorizedChangeAsmmffmr = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmmffmr = true;
                    }
                }
            }
            if (!$authorizedChangeAsmmffmr) {
                $entity->setAsmmffmr(null);
            }
            $authorizedChangeTbwPc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwPc = true;
                    }
                }
            }
            if (!$authorizedChangeTbwPc) {
                $entity->setTbwPc(null);
            }
            $authorizedChangeTbwffmPc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPc = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPc) {
                $entity->setTbwffmPc(null);
            }
            $authorizedChangeTbwffmPcRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcRef = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcRef) {
                $entity->setTbwffmPcRef(null);
            }
            $authorizedChangeTbwffmPcEt = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcEt = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcEt) {
                $entity->setTbwffmPcEt(null);
            }
            $authorizedChangeFfwPc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPc = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPc) {
                $entity->setFfwPc(null);
            }
            $authorizedChangeFfw = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfw = true;
                    }
                }
            }
            if (!$authorizedChangeFfw) {
                $entity->setFfw(null);
            }
            $authorizedChangeFfwPcRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcRef = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcRef) {
                $entity->setFfwPcRef(null);
            }
            $authorizedChangeFfwRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwRef = true;
                    }
                }
            }
            if (!$authorizedChangeFfwRef) {
                $entity->setFfwRef(null);
            }
            $authorizedChangeFfwEt = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwEt = true;
                    }
                }
            }
            if (!$authorizedChangeFfwEt) {
                $entity->setFfwEt(null);
            }
            $authorizedChangeEcwSpec = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwSpec = true;
                    }
                }
            }
            if (!$authorizedChangeEcwSpec) {
                $entity->setEcwSpec(null);
            }
            $authorizedChangeEcwPc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPc = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPc) {
                $entity->setEcwPc(null);
            }
            $authorizedChangeEcwffmPc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwffmPc = true;
                    }
                }
            }
            if (!$authorizedChangeEcwffmPc) {
                $entity->setEcwffmPc(null);
            }
            $authorizedChangeIcw = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcw = true;
                    }
                }
            }
            if (!$authorizedChangeIcw) {
                $entity->setIcw(null);
            }
            $authorizedChangeIcwPc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPc = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPc) {
                $entity->setIcwPc(null);
            }
            $authorizedChangeFficwPcRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcRef = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcRef) {
                $entity->setFficwPcRef(null);
            }
            $authorizedChangeFficwRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwRef = true;
                    }
                }
            }
            if (!$authorizedChangeFficwRef) {
                $entity->setFficwRef(null);
            }
            $authorizedChangeFfecwRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwRef = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwRef) {
                $entity->setFfecwRef(null);
            }
            $authorizedChangeFfecwPcRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcRef = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcRef) {
                $entity->setFfecwPcRef(null);
            }
            $authorizedChangeEcwicwPcEt = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwicwPcEt = true;
                    }
                }
            }
            if (!$authorizedChangeEcwicwPcEt) {
                $entity->setEcwicwPcEt(null);
            }
            $authorizedChangeCmo = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCmo = true;
                    }
                }
            }
            if (!$authorizedChangeCmo) {
                $entity->setCmo(null);
            }
            $authorizedChangeSlm = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeSlm = true;
                    }
                }
            }
            if (!$authorizedChangeSlm) {
                $entity->setSlm(null);
            }
            $authorizedChangeMo = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMo = true;
                    }
                }
            }
            if (!$authorizedChangeMo) {
                $entity->setMo(null);
            }
            $authorizedChangeEcs = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcs = true;
                    }
                }
            }
            if (!$authorizedChangeEcs) {
                $entity->setEcs(null);
            }
            $authorizedChangeMs = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMs = true;
                    }
                }
            }
            if (!$authorizedChangeMs) {
                $entity->setMs(null);
            }
            $authorizedChangeSmi = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeSmi = true;
                    }
                }
            }
            if (!$authorizedChangeSmi) {
                $entity->setSmi(null);
            }
            $authorizedChangeFmiIndiceComp = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmiIndiceComp = true;
                    }
                }
            }
            if (!$authorizedChangeFmiIndiceComp) {
                $entity->setFmiIndiceComp(null);
            }
            $authorizedChangeSlmir = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeSlmir = true;
                    }
                }
            }
            if (!$authorizedChangeSlmir) {
                $entity->setSlmir(null);
            }
            $authorizedChangeDasmmKg = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeDasmmKg = true;
                    }
                }
            }
            if (!$authorizedChangeDasmmKg) {
                $entity->setDasmmKg(null);
            }
            $authorizedChangeFfeirRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfeirRef = true;
                    }
                }
            }
            if (!$authorizedChangeFfeirRef) {
                $entity->setFfeirRef(null);
            }
            $authorizedChangeBmrRefKjoules = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmrRefKjoules = true;
                    }
                }
            }
            if (!$authorizedChangeBmrRefKjoules) {
                $entity->setBmrRefKjoules(null);
            }
            $authorizedChangeMmsPcRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmsPcRef = true;
                    }
                }
            }
            if (!$authorizedChangeMmsPcRef) {
                $entity->setMmsPcRef(null);
            }
            $authorizedChangeTbwFm = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwFm = true;
                    }
                }
            }
            if (!$authorizedChangeTbwFm) {
                $entity->setTbwFm(null);
            }
            $authorizedChangeZ200z5r = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeZ200z5r = true;
                    }
                }
            }
            if (!$authorizedChangeZ200z5r) {
                $entity->setZ200z5r(null);
            }
            $authorizedChangeWhr = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeWhr = true;
                    }
                }
            }
            if (!$authorizedChangeWhr) {
                $entity->setWhr(null);
            }
            $authorizedChangeWhtr = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeWhtr = true;
                    }
                }
            }
            if (!$authorizedChangeWhtr) {
                $entity->setWhtr(null);
            }
            $authorizedChangeWhtrRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeWhtrRef = true;
                    }
                }
            }
            if (!$authorizedChangeWhtrRef) {
                $entity->setWhtrRef(null);
            }
            $authorizedChangeBmr = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmr = true;
                    }
                }
            }
            if (!$authorizedChangeBmr) {
                $entity->setBmr(null);
            }
            $authorizedChangeBmrKjoules = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmrKjoules = true;
                    }
                }
            }
            if (!$authorizedChangeBmrKjoules) {
                $entity->setBmrKjoules(null);
            }
            $authorizedChangeAdcr = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAdcr = true;
                    }
                }
            }
            if (!$authorizedChangeAdcr) {
                $entity->setAdcr(null);
            }
            $authorizedChangeAdcrKjoules = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAdcrKjoules = true;
                    }
                }
            }
            if (!$authorizedChangeAdcrKjoules) {
                $entity->setAdcrKjoules(null);
            }
            $authorizedChangeFmHcPc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPc = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPc) {
                $entity->setFmHcPc(null);
            }
            $authorizedChangeFmHcKg = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcKg = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcKg) {
                $entity->setFmHcKg(null);
            }
            $authorizedChangeFmHcPcRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcRef = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcRef) {
                $entity->setFmHcPcRef(null);
            }
            $authorizedChangeFmHcEtKg = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcEtKg = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcEtKg) {
                $entity->setFmHcEtKg(null);
            }
            $authorizedChangeFmEtKg = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmEtKg = true;
                    }
                }
            }
            if (!$authorizedChangeFmEtKg) {
                $entity->setFmEtKg(null);
            }
            $authorizedChangeFmPc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPc = true;
                    }
                }
            }
            if (!$authorizedChangeFmPc) {
                $entity->setFmPc(null);
            }
            $authorizedChangeMmsKg = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmsKg = true;
                    }
                }
            }
            if (!$authorizedChangeMmsKg) {
                $entity->setMmsKg(null);
            }
            $authorizedChangeMmsPc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmsPc = true;
                    }
                }
            }
            if (!$authorizedChangeMmsPc) {
                $entity->setMmsPc(null);
            }
            $authorizedChangeMmsRefKg = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmsRefKg = true;
                    }
                }
            }
            if (!$authorizedChangeMmsRefKg) {
                $entity->setMmsRefKg(null);
            }
            $authorizedChangeMmsEtKg = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmsEtKg = true;
                    }
                }
            }
            if (!$authorizedChangeMmsEtKg) {
                $entity->setMmsEtKg(null);
            }
            $authorizedChangeBcm = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBcm = true;
                    }
                }
            }
            if (!$authorizedChangeBcm) {
                $entity->setBcm(null);
            }
            $authorizedChangeMpMetaKg = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMpMetaKg = true;
                    }
                }
            }
            if (!$authorizedChangeMpMetaKg) {
                $entity->setMpMetaKg(null);
            }
            $authorizedChangeMpMetaPc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMpMetaPc = true;
                    }
                }
            }
            if (!$authorizedChangeMpMetaPc) {
                $entity->setMpMetaPc(null);
            }
            $authorizedChangeTbwRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwRef = true;
                    }
                }
            }
            if (!$authorizedChangeTbwRef) {
                $entity->setTbwRef(null);
            }
            $authorizedChangeIcwfm = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwfm = true;
                    }
                }
            }
            if (!$authorizedChangeIcwfm) {
                $entity->setIcwfm(null);
            }
            $authorizedChangeEcwfm = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwfm = true;
                    }
                }
            }
            if (!$authorizedChangeEcwfm) {
                $entity->setEcwfm(null);
            }
            $authorizedChangeFficw = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficw = true;
                    }
                }
            }
            if (!$authorizedChangeFficw) {
                $entity->setFficw(null);
            }
            $authorizedChangeFfecw = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecw = true;
                    }
                }
            }
            if (!$authorizedChangeFfecw) {
                $entity->setFfecw(null);
            }
            $authorizedChangeFfecwPc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPc = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPc) {
                $entity->setFfecwPc(null);
            }
            $authorizedChangeFficwPc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPc = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPc) {
                $entity->setFficwPc(null);
            }
            $authorizedChangeFficwEt = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwEt = true;
                    }
                }
            }
            if (!$authorizedChangeFficwEt) {
                $entity->setFficwEt(null);
            }
            $authorizedChangeFfecwEt = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwEt = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwEt) {
                $entity->setFfecwEt(null);
            }
            $authorizedChangeFfecwicwPcEt = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwicwPcEt = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwicwPcEt) {
                $entity->setFfecwicwPcEt(null);
            }
            $authorizedChangeFfeir = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfeir = true;
                    }
                }
            }
            if (!$authorizedChangeFfeir) {
                $entity->setFfeir(null);
            }
            $authorizedChangeMp = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMp = true;
                    }
                }
            }
            if (!$authorizedChangeMp) {
                $entity->setMp(null);
            }
            $authorizedChangeMmhi = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmhi = true;
                    }
                }
            }
            if (!$authorizedChangeMmhi) {
                $entity->setMmhi(null);
            }
            $authorizedChangeAsmhi = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmhi = true;
                    }
                }
            }
            if (!$authorizedChangeAsmhi) {
                $entity->setAsmhi(null);
            }
            $authorizedChangeAsmli = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmli = true;
                    }
                }
            }
            if (!$authorizedChangeAsmli) {
                $entity->setAsmli(null);
            }
            $authorizedChangeBcmffmr = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBcmffmr = true;
                    }
                }
            }
            if (!$authorizedChangeBcmffmr) {
                $entity->setBcmffmr(null);
            }
            $authorizedChangeFmir = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmir = true;
                    }
                }
            }
            if (!$authorizedChangeFmir) {
                $entity->setFmir(null);
            }
            $authorizedChangeFmslmir = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmslmir = true;
                    }
                }
            }
            if (!$authorizedChangeFmslmir) {
                $entity->setFmslmir(null);
            }
            $authorizedChangeFmHcPcEt = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcEt = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcEt) {
                $entity->setFmHcPcEt(null);
            }
            $authorizedChangeFmPcEt = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcEt = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcEt) {
                $entity->setFmPcEt(null);
            }
            $authorizedChangeFmi = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmi = true;
                    }
                }
            }
            if (!$authorizedChangeFmi) {
                $entity->setFmi(null);
            }
            $authorizedChangeFfecwRefDivFfecw = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwRefDivFfecw = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwRefDivFfecw) {
                $entity->setFfecwRefDivFfecw(null);
            }
            $authorizedChangeFficwRefDivFficw = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwRefDivFficw = true;
                    }
                }
            }
            if (!$authorizedChangeFficwRefDivFficw) {
                $entity->setFficwRefDivFficw(null);
            }
            $authorizedChangeIcwEt = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwEt = true;
                    }
                }
            }
            if (!$authorizedChangeIcwEt) {
                $entity->setIcwEt(null);
            }
            $authorizedChangeBmrEt = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmrEt = true;
                    }
                }
            }
            if (!$authorizedChangeBmrEt) {
                $entity->setBmrEt(null);
            }
            $authorizedChangeMmsPcEt = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmsPcEt = true;
                    }
                }
            }
            if (!$authorizedChangeMmsPcEt) {
                $entity->setMmsPcEt(null);
            }
            $authorizedChangeTbe = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbe = true;
                    }
                }
            }
            if (!$authorizedChangeTbe) {
                $entity->setTbe(null);
            }
            $authorizedChangeCmoRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCmoRef = true;
                    }
                }
            }
            if (!$authorizedChangeCmoRef) {
                $entity->setCmoRef(null);
            }
            $authorizedChangeCmoEt = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCmoEt = true;
                    }
                }
            }
            if (!$authorizedChangeCmoEt) {
                $entity->setCmoEt(null);
            }
            $authorizedChangeSlmRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeSlmRef = true;
                    }
                }
            }
            if (!$authorizedChangeSlmRef) {
                $entity->setSlmRef(null);
            }
            $authorizedChangeAsmtli = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmtli = true;
                    }
                }
            }
            if (!$authorizedChangeAsmtli) {
                $entity->setAsmtli(null);
            }
            $authorizedChangeEcsRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcsRef = true;
                    }
                }
            }
            if (!$authorizedChangeEcsRef) {
                $entity->setEcsRef(null);
            }
            $authorizedChangeMpMetaRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMpMetaRef = true;
                    }
                }
            }
            if (!$authorizedChangeMpMetaRef) {
                $entity->setMpMetaRef(null);
            }
            $authorizedChangeBcmRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBcmRef = true;
                    }
                }
            }
            if (!$authorizedChangeBcmRef) {
                $entity->setBcmRef(null);
            }
            $authorizedChangeBcmEt = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBcmEt = true;
                    }
                }
            }
            if (!$authorizedChangeBcmEt) {
                $entity->setBcmEt(null);
            }
            $authorizedChangeMpRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMpRef = true;
                    }
                }
            }
            if (!$authorizedChangeMpRef) {
                $entity->setMpRef(null);
            }
            $authorizedChangeMpMetaEtKg = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMpMetaEtKg = true;
                    }
                }
            }
            if (!$authorizedChangeMpMetaEtKg) {
                $entity->setMpMetaEtKg(null);
            }
            $authorizedChangeFmHcPc100 = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPc100 = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPc100) {
                $entity->setFmHcPc100(null);
            }
            $authorizedChangeFmHcPcStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcStdA = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcStdA) {
                $entity->setFmHcPcStdA(null);
            }
            $authorizedChangeFmHcPcStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcStdB = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcStdB) {
                $entity->setFmHcPcStdB(null);
            }
            $authorizedChangeFmHcPcStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcStdC = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcStdC) {
                $entity->setFmHcPcStdC(null);
            }
            $authorizedChangeFmHcPcStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcStdD = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcStdD) {
                $entity->setFmHcPcStdD(null);
            }
            $authorizedChangeFmHcPcStdE = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcStdE = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcStdE) {
                $entity->setFmHcPcStdE(null);
            }
            $authorizedChangeFmHcPcStdF = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcStdF = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcStdF) {
                $entity->setFmHcPcStdF(null);
            }
            $authorizedChangeFmHcPcZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcZaMax) {
                $entity->setFmHcPcZaMax(null);
            }
            $authorizedChangeFmHcPcZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcZaMaxColor) {
                $entity->setFmHcPcZaMaxColor(null);
            }
            $authorizedChangeFmHcPcZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcZbMax) {
                $entity->setFmHcPcZbMax(null);
            }
            $authorizedChangeFmHcPcZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcZbMaxColor) {
                $entity->setFmHcPcZbMaxColor(null);
            }
            $authorizedChangeFmHcPcZcMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcZcMax = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcZcMax) {
                $entity->setFmHcPcZcMax(null);
            }
            $authorizedChangeFmHcPcZcMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcZcMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcZcMaxColor) {
                $entity->setFmHcPcZcMaxColor(null);
            }
            $authorizedChangeFmHcPcZdMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcZdMax = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcZdMax) {
                $entity->setFmHcPcZdMax(null);
            }
            $authorizedChangeFmHcPcZdMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcZdMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcZdMaxColor) {
                $entity->setFmHcPcZdMaxColor(null);
            }
            $authorizedChangeFmHcPcZeMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcZeMax = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcZeMax) {
                $entity->setFmHcPcZeMax(null);
            }
            $authorizedChangeFmHcPcZeMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcZeMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcZeMaxColor) {
                $entity->setFmHcPcZeMaxColor(null);
            }
            $authorizedChangeFmHcPcZfMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcZfMax = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcZfMax) {
                $entity->setFmHcPcZfMax(null);
            }
            $authorizedChangeFmHcPcZfMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcZfMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcZfMaxColor) {
                $entity->setFmHcPcZfMaxColor(null);
            }
            $authorizedChangeFmHcPcZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcZone = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcZone) {
                $entity->setFmHcPcZone(null);
            }
            $authorizedChangeFfwPc100 = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPc100 = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPc100) {
                $entity->setFfwPc100(null);
            }
            $authorizedChangeFfwPcStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcStdA = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcStdA) {
                $entity->setFfwPcStdA(null);
            }
            $authorizedChangeFfwPcStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcStdB = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcStdB) {
                $entity->setFfwPcStdB(null);
            }
            $authorizedChangeFfwPcStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcStdC = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcStdC) {
                $entity->setFfwPcStdC(null);
            }
            $authorizedChangeFfwPcStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcStdD = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcStdD) {
                $entity->setFfwPcStdD(null);
            }
            $authorizedChangeFfwPcStdE = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcStdE = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcStdE) {
                $entity->setFfwPcStdE(null);
            }
            $authorizedChangeFfwPcStdF = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcStdF = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcStdF) {
                $entity->setFfwPcStdF(null);
            }
            $authorizedChangeFfwPcStdG = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcStdG = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcStdG) {
                $entity->setFfwPcStdG(null);
            }
            $authorizedChangeFfwPcZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcZaMax) {
                $entity->setFfwPcZaMax(null);
            }
            $authorizedChangeFfwPcZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcZaMaxColor) {
                $entity->setFfwPcZaMaxColor(null);
            }
            $authorizedChangeFfwPcZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcZbMax) {
                $entity->setFfwPcZbMax(null);
            }
            $authorizedChangeFfwPcZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcZbMaxColor) {
                $entity->setFfwPcZbMaxColor(null);
            }
            $authorizedChangeFfwPcZcMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcZcMax = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcZcMax) {
                $entity->setFfwPcZcMax(null);
            }
            $authorizedChangeFfwPcZcMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcZcMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcZcMaxColor) {
                $entity->setFfwPcZcMaxColor(null);
            }
            $authorizedChangeFfwPcZdMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcZdMax = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcZdMax) {
                $entity->setFfwPcZdMax(null);
            }
            $authorizedChangeFfwPcZdMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcZdMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcZdMaxColor) {
                $entity->setFfwPcZdMaxColor(null);
            }
            $authorizedChangeFfwPcZeMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcZeMax = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcZeMax) {
                $entity->setFfwPcZeMax(null);
            }
            $authorizedChangeFfwPcZeMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcZeMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcZeMaxColor) {
                $entity->setFfwPcZeMaxColor(null);
            }
            $authorizedChangeFfwPcZfMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcZfMax = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcZfMax) {
                $entity->setFfwPcZfMax(null);
            }
            $authorizedChangeFfwPcZfMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcZfMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcZfMaxColor) {
                $entity->setFfwPcZfMaxColor(null);
            }
            $authorizedChangeFfwPcZgMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcZgMax = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcZgMax) {
                $entity->setFfwPcZgMax(null);
            }
            $authorizedChangeFfwPcZgMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcZgMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcZgMaxColor) {
                $entity->setFfwPcZgMaxColor(null);
            }
            $authorizedChangeFfwPcZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcZone = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcZone) {
                $entity->setFfwPcZone(null);
            }
            $authorizedChangeMmhiStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmhiStdA = true;
                    }
                }
            }
            if (!$authorizedChangeMmhiStdA) {
                $entity->setMmhiStdA(null);
            }
            $authorizedChangeMmhiStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmhiStdB = true;
                    }
                }
            }
            if (!$authorizedChangeMmhiStdB) {
                $entity->setMmhiStdB(null);
            }
            $authorizedChangeMmhiStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmhiStdC = true;
                    }
                }
            }
            if (!$authorizedChangeMmhiStdC) {
                $entity->setMmhiStdC(null);
            }
            $authorizedChangeMmhiStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmhiStdD = true;
                    }
                }
            }
            if (!$authorizedChangeMmhiStdD) {
                $entity->setMmhiStdD(null);
            }
            $authorizedChangeMmhiZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmhiZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeMmhiZaMax) {
                $entity->setMmhiZaMax(null);
            }
            $authorizedChangeMmhiZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmhiZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeMmhiZaMaxColor) {
                $entity->setMmhiZaMaxColor(null);
            }
            $authorizedChangeMmhiZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmhiZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeMmhiZbMax) {
                $entity->setMmhiZbMax(null);
            }
            $authorizedChangeMmhiZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmhiZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeMmhiZbMaxColor) {
                $entity->setMmhiZbMaxColor(null);
            }
            $authorizedChangeMmhiZcMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmhiZcMax = true;
                    }
                }
            }
            if (!$authorizedChangeMmhiZcMax) {
                $entity->setMmhiZcMax(null);
            }
            $authorizedChangeMmhiZcMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmhiZcMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeMmhiZcMaxColor) {
                $entity->setMmhiZcMaxColor(null);
            }
            $authorizedChangeMmhiZdMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmhiZdMax = true;
                    }
                }
            }
            if (!$authorizedChangeMmhiZdMax) {
                $entity->setMmhiZdMax(null);
            }
            $authorizedChangeMmhiZdMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmhiZdMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeMmhiZdMaxColor) {
                $entity->setMmhiZdMaxColor(null);
            }
            $authorizedChangeMmhiZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmhiZone = true;
                    }
                }
            }
            if (!$authorizedChangeMmhiZone) {
                $entity->setMmhiZone(null);
            }
            $authorizedChangeFmHcPcInf = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcInf = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcInf) {
                $entity->setFmHcPcInf(null);
            }
            $authorizedChangeAdcrZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAdcrZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeAdcrZaMax) {
                $entity->setAdcrZaMax(null);
            }
            $authorizedChangeAdcrZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAdcrZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeAdcrZaMaxColor) {
                $entity->setAdcrZaMaxColor(null);
            }
            $authorizedChangeAdcrZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAdcrZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeAdcrZbMax) {
                $entity->setAdcrZbMax(null);
            }
            $authorizedChangeAdcrZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAdcrZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeAdcrZbMaxColor) {
                $entity->setAdcrZbMaxColor(null);
            }
            $authorizedChangeAdcrZcMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAdcrZcMax = true;
                    }
                }
            }
            if (!$authorizedChangeAdcrZcMax) {
                $entity->setAdcrZcMax(null);
            }
            $authorizedChangeAdcrZcMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAdcrZcMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeAdcrZcMaxColor) {
                $entity->setAdcrZcMaxColor(null);
            }
            $authorizedChangeAdcrZdMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAdcrZdMax = true;
                    }
                }
            }
            if (!$authorizedChangeAdcrZdMax) {
                $entity->setAdcrZdMax(null);
            }
            $authorizedChangeAdcrZdMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAdcrZdMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeAdcrZdMaxColor) {
                $entity->setAdcrZdMaxColor(null);
            }
            $authorizedChangeAdcrZeMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAdcrZeMax = true;
                    }
                }
            }
            if (!$authorizedChangeAdcrZeMax) {
                $entity->setAdcrZeMax(null);
            }
            $authorizedChangeAdcrZeMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAdcrZeMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeAdcrZeMaxColor) {
                $entity->setAdcrZeMaxColor(null);
            }
            $authorizedChangeAdcrZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAdcrZone = true;
                    }
                }
            }
            if (!$authorizedChangeAdcrZone) {
                $entity->setAdcrZone(null);
            }
            $authorizedChangeFmHcPcRef100 = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcRef100 = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcRef100) {
                $entity->setFmHcPcRef100(null);
            }
            $authorizedChangeAsmmi = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmmi = true;
                    }
                }
            }
            if (!$authorizedChangeAsmmi) {
                $entity->setAsmmi(null);
            }
            $authorizedChangeAsmmiStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmmiStdA = true;
                    }
                }
            }
            if (!$authorizedChangeAsmmiStdA) {
                $entity->setAsmmiStdA(null);
            }
            $authorizedChangeAsmmiStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmmiStdB = true;
                    }
                }
            }
            if (!$authorizedChangeAsmmiStdB) {
                $entity->setAsmmiStdB(null);
            }
            $authorizedChangeAsmmiStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmmiStdC = true;
                    }
                }
            }
            if (!$authorizedChangeAsmmiStdC) {
                $entity->setAsmmiStdC(null);
            }
            $authorizedChangeAsmmiStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmmiStdD = true;
                    }
                }
            }
            if (!$authorizedChangeAsmmiStdD) {
                $entity->setAsmmiStdD(null);
            }
            $authorizedChangeAsmmiZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmmiZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeAsmmiZaMax) {
                $entity->setAsmmiZaMax(null);
            }
            $authorizedChangeAsmmiZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmmiZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeAsmmiZaMaxColor) {
                $entity->setAsmmiZaMaxColor(null);
            }
            $authorizedChangeAsmmiZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmmiZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeAsmmiZbMax) {
                $entity->setAsmmiZbMax(null);
            }
            $authorizedChangeAsmmiZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmmiZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeAsmmiZbMaxColor) {
                $entity->setAsmmiZbMaxColor(null);
            }
            $authorizedChangeAsmmiZcMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmmiZcMax = true;
                    }
                }
            }
            if (!$authorizedChangeAsmmiZcMax) {
                $entity->setAsmmiZcMax(null);
            }
            $authorizedChangeAsmmiZcMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmmiZcMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeAsmmiZcMaxColor) {
                $entity->setAsmmiZcMaxColor(null);
            }
            $authorizedChangeAsmmiZdMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmmiZdMax = true;
                    }
                }
            }
            if (!$authorizedChangeAsmmiZdMax) {
                $entity->setAsmmiZdMax(null);
            }
            $authorizedChangeAsmmiZdMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmmiZdMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeAsmmiZdMaxColor) {
                $entity->setAsmmiZdMaxColor(null);
            }
            $authorizedChangeAsmmiZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmmiZone = true;
                    }
                }
            }
            if (!$authorizedChangeAsmmiZone) {
                $entity->setAsmmiZone(null);
            }
            $authorizedChangeEcwPc100 = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPc100 = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPc100) {
                $entity->setEcwPc100(null);
            }
            $authorizedChangeEcwPcRef100 = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcRef100 = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcRef100) {
                $entity->setEcwPcRef100(null);
            }
            $authorizedChangeEcwPcStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcStdA = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcStdA) {
                $entity->setEcwPcStdA(null);
            }
            $authorizedChangeEcwPcStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcStdB = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcStdB) {
                $entity->setEcwPcStdB(null);
            }
            $authorizedChangeEcwPcStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcStdC = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcStdC) {
                $entity->setEcwPcStdC(null);
            }
            $authorizedChangeEcwPcStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcStdD = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcStdD) {
                $entity->setEcwPcStdD(null);
            }
            $authorizedChangeEcwPcStdE = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcStdE = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcStdE) {
                $entity->setEcwPcStdE(null);
            }
            $authorizedChangeEcwPcStdF = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcStdF = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcStdF) {
                $entity->setEcwPcStdF(null);
            }
            $authorizedChangeEcwPcStdG = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcStdG = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcStdG) {
                $entity->setEcwPcStdG(null);
            }
            $authorizedChangeEcwPcZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcZaMax) {
                $entity->setEcwPcZaMax(null);
            }
            $authorizedChangeEcwPcZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcZaMaxColor) {
                $entity->setEcwPcZaMaxColor(null);
            }
            $authorizedChangeEcwPcZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcZbMax) {
                $entity->setEcwPcZbMax(null);
            }
            $authorizedChangeEcwPcZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcZbMaxColor) {
                $entity->setEcwPcZbMaxColor(null);
            }
            $authorizedChangeEcwPcZcMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcZcMax = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcZcMax) {
                $entity->setEcwPcZcMax(null);
            }
            $authorizedChangeEcwPcZcMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcZcMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcZcMaxColor) {
                $entity->setEcwPcZcMaxColor(null);
            }
            $authorizedChangeEcwPcZdMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcZdMax = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcZdMax) {
                $entity->setEcwPcZdMax(null);
            }
            $authorizedChangeEcwPcZdMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcZdMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcZdMaxColor) {
                $entity->setEcwPcZdMaxColor(null);
            }
            $authorizedChangeEcwPcZeMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcZeMax = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcZeMax) {
                $entity->setEcwPcZeMax(null);
            }
            $authorizedChangeEcwPcZeMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcZeMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcZeMaxColor) {
                $entity->setEcwPcZeMaxColor(null);
            }
            $authorizedChangeEcwPcZfMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcZfMax = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcZfMax) {
                $entity->setEcwPcZfMax(null);
            }
            $authorizedChangeEcwPcZfMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcZfMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcZfMaxColor) {
                $entity->setEcwPcZfMaxColor(null);
            }
            $authorizedChangeEcwPcZgMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcZgMax = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcZgMax) {
                $entity->setEcwPcZgMax(null);
            }
            $authorizedChangeEcwPcZgMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcZgMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcZgMaxColor) {
                $entity->setEcwPcZgMaxColor(null);
            }
            $authorizedChangeEcwPcZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcZone = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcZone) {
                $entity->setEcwPcZone(null);
            }
            $authorizedChangeIcwPc100 = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPc100 = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPc100) {
                $entity->setIcwPc100(null);
            }
            $authorizedChangeIcwPcRef100 = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcRef100 = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcRef100) {
                $entity->setIcwPcRef100(null);
            }
            $authorizedChangeIcwPcStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcStdA = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcStdA) {
                $entity->setIcwPcStdA(null);
            }
            $authorizedChangeIcwPcStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcStdB = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcStdB) {
                $entity->setIcwPcStdB(null);
            }
            $authorizedChangeIcwPcStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcStdC = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcStdC) {
                $entity->setIcwPcStdC(null);
            }
            $authorizedChangeIcwPcStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcStdD = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcStdD) {
                $entity->setIcwPcStdD(null);
            }
            $authorizedChangeIcwPcStdE = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcStdE = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcStdE) {
                $entity->setIcwPcStdE(null);
            }
            $authorizedChangeIcwPcStdF = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcStdF = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcStdF) {
                $entity->setIcwPcStdF(null);
            }
            $authorizedChangeIcwPcStdG = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcStdG = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcStdG) {
                $entity->setIcwPcStdG(null);
            }
            $authorizedChangeIcwPcZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcZaMax) {
                $entity->setIcwPcZaMax(null);
            }
            $authorizedChangeIcwPcZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcZaMaxColor) {
                $entity->setIcwPcZaMaxColor(null);
            }
            $authorizedChangeIcwPcZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcZbMax) {
                $entity->setIcwPcZbMax(null);
            }
            $authorizedChangeIcwPcZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcZbMaxColor) {
                $entity->setIcwPcZbMaxColor(null);
            }
            $authorizedChangeIcwPcZcMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcZcMax = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcZcMax) {
                $entity->setIcwPcZcMax(null);
            }
            $authorizedChangeIcwPcZcMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcZcMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcZcMaxColor) {
                $entity->setIcwPcZcMaxColor(null);
            }
            $authorizedChangeIcwPcZdMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcZdMax = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcZdMax) {
                $entity->setIcwPcZdMax(null);
            }
            $authorizedChangeIcwPcZdMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcZdMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcZdMaxColor) {
                $entity->setIcwPcZdMaxColor(null);
            }
            $authorizedChangeIcwPcZeMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcZeMax = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcZeMax) {
                $entity->setIcwPcZeMax(null);
            }
            $authorizedChangeIcwPcZeMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcZeMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcZeMaxColor) {
                $entity->setIcwPcZeMaxColor(null);
            }
            $authorizedChangeIcwPcZfMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcZfMax = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcZfMax) {
                $entity->setIcwPcZfMax(null);
            }
            $authorizedChangeIcwPcZfMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcZfMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcZfMaxColor) {
                $entity->setIcwPcZfMaxColor(null);
            }
            $authorizedChangeIcwPcZgMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcZgMax = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcZgMax) {
                $entity->setIcwPcZgMax(null);
            }
            $authorizedChangeIcwPcZgMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcZgMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcZgMaxColor) {
                $entity->setIcwPcZgMaxColor(null);
            }
            $authorizedChangeIcwPcZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcZone = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcZone) {
                $entity->setIcwPcZone(null);
            }
            $authorizedChangeFmPc100 = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPc100 = true;
                    }
                }
            }
            if (!$authorizedChangeFmPc100) {
                $entity->setFmPc100(null);
            }
            $authorizedChangeFmPcStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcStdA = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcStdA) {
                $entity->setFmPcStdA(null);
            }
            $authorizedChangeFmPcStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcStdB = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcStdB) {
                $entity->setFmPcStdB(null);
            }
            $authorizedChangeFmPcStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcStdC = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcStdC) {
                $entity->setFmPcStdC(null);
            }
            $authorizedChangeFmPcStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcStdD = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcStdD) {
                $entity->setFmPcStdD(null);
            }
            $authorizedChangeFmPcStdE = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcStdE = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcStdE) {
                $entity->setFmPcStdE(null);
            }
            $authorizedChangeFmPcStdF = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcStdF = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcStdF) {
                $entity->setFmPcStdF(null);
            }
            $authorizedChangeFmPcZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcZaMax) {
                $entity->setFmPcZaMax(null);
            }
            $authorizedChangeFmPcZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcZaMaxColor) {
                $entity->setFmPcZaMaxColor(null);
            }
            $authorizedChangeFmPcZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcZbMax) {
                $entity->setFmPcZbMax(null);
            }
            $authorizedChangeFmPcZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcZbMaxColor) {
                $entity->setFmPcZbMaxColor(null);
            }
            $authorizedChangeFmPcZcMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcZcMax = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcZcMax) {
                $entity->setFmPcZcMax(null);
            }
            $authorizedChangeFmPcZcMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcZcMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcZcMaxColor) {
                $entity->setFmPcZcMaxColor(null);
            }
            $authorizedChangeFmPcZdMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcZdMax = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcZdMax) {
                $entity->setFmPcZdMax(null);
            }
            $authorizedChangeFmPcZdMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcZdMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcZdMaxColor) {
                $entity->setFmPcZdMaxColor(null);
            }
            $authorizedChangeFmPcZeMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcZeMax = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcZeMax) {
                $entity->setFmPcZeMax(null);
            }
            $authorizedChangeFmPcZeMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcZeMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcZeMaxColor) {
                $entity->setFmPcZeMaxColor(null);
            }
            $authorizedChangeFmPcZfMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcZfMax = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcZfMax) {
                $entity->setFmPcZfMax(null);
            }
            $authorizedChangeFmPcZfMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcZfMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcZfMaxColor) {
                $entity->setFmPcZfMaxColor(null);
            }
            $authorizedChangeFmPcZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcZone = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcZone) {
                $entity->setFmPcZone(null);
            }
            $authorizedChangeTbwffmPc100 = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPc100 = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPc100) {
                $entity->setTbwffmPc100(null);
            }
            $authorizedChangeTbwffmPcStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcStdA = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcStdA) {
                $entity->setTbwffmPcStdA(null);
            }
            $authorizedChangeTbwffmPcStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcStdB = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcStdB) {
                $entity->setTbwffmPcStdB(null);
            }
            $authorizedChangeTbwffmPcStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcStdC = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcStdC) {
                $entity->setTbwffmPcStdC(null);
            }
            $authorizedChangeTbwffmPcStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcStdD = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcStdD) {
                $entity->setTbwffmPcStdD(null);
            }
            $authorizedChangeTbwffmPcStdE = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcStdE = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcStdE) {
                $entity->setTbwffmPcStdE(null);
            }
            $authorizedChangeTbwffmPcStdF = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcStdF = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcStdF) {
                $entity->setTbwffmPcStdF(null);
            }
            $authorizedChangeTbwffmPcStdG = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcStdG = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcStdG) {
                $entity->setTbwffmPcStdG(null);
            }
            $authorizedChangeTbwffmPcZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcZaMax) {
                $entity->setTbwffmPcZaMax(null);
            }
            $authorizedChangeTbwffmPcZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcZaMaxColor) {
                $entity->setTbwffmPcZaMaxColor(null);
            }
            $authorizedChangeTbwffmPcZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcZbMax) {
                $entity->setTbwffmPcZbMax(null);
            }
            $authorizedChangeTbwffmPcZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcZbMaxColor) {
                $entity->setTbwffmPcZbMaxColor(null);
            }
            $authorizedChangeTbwffmPcZcMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcZcMax = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcZcMax) {
                $entity->setTbwffmPcZcMax(null);
            }
            $authorizedChangeTbwffmPcZcMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcZcMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcZcMaxColor) {
                $entity->setTbwffmPcZcMaxColor(null);
            }
            $authorizedChangeTbwffmPcZdMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcZdMax = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcZdMax) {
                $entity->setTbwffmPcZdMax(null);
            }
            $authorizedChangeTbwffmPcZdMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcZdMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcZdMaxColor) {
                $entity->setTbwffmPcZdMaxColor(null);
            }
            $authorizedChangeTbwffmPcZeMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcZeMax = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcZeMax) {
                $entity->setTbwffmPcZeMax(null);
            }
            $authorizedChangeTbwffmPcZeMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcZeMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcZeMaxColor) {
                $entity->setTbwffmPcZeMaxColor(null);
            }
            $authorizedChangeTbwffmPcZfMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcZfMax = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcZfMax) {
                $entity->setTbwffmPcZfMax(null);
            }
            $authorizedChangeTbwffmPcZfMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcZfMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcZfMaxColor) {
                $entity->setTbwffmPcZfMaxColor(null);
            }
            $authorizedChangeTbwffmPcZgMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcZgMax = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcZgMax) {
                $entity->setTbwffmPcZgMax(null);
            }
            $authorizedChangeTbwffmPcZgMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcZgMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcZgMaxColor) {
                $entity->setTbwffmPcZgMaxColor(null);
            }
            $authorizedChangeTbwffmPcZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcZone = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcZone) {
                $entity->setTbwffmPcZone(null);
            }
            $authorizedChangeDffmi = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeDffmi = true;
                    }
                }
            }
            if (!$authorizedChangeDffmi) {
                $entity->setDffmi(null);
            }
            $authorizedChangeDffmiStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeDffmiStdA = true;
                    }
                }
            }
            if (!$authorizedChangeDffmiStdA) {
                $entity->setDffmiStdA(null);
            }
            $authorizedChangeDffmiStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeDffmiStdB = true;
                    }
                }
            }
            if (!$authorizedChangeDffmiStdB) {
                $entity->setDffmiStdB(null);
            }
            $authorizedChangeDffmiStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeDffmiStdC = true;
                    }
                }
            }
            if (!$authorizedChangeDffmiStdC) {
                $entity->setDffmiStdC(null);
            }
            $authorizedChangeDffmiStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeDffmiStdD = true;
                    }
                }
            }
            if (!$authorizedChangeDffmiStdD) {
                $entity->setDffmiStdD(null);
            }
            $authorizedChangeDffmiZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeDffmiZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeDffmiZaMax) {
                $entity->setDffmiZaMax(null);
            }
            $authorizedChangeDffmiZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeDffmiZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeDffmiZaMaxColor) {
                $entity->setDffmiZaMaxColor(null);
            }
            $authorizedChangeDffmiZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeDffmiZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeDffmiZbMax) {
                $entity->setDffmiZbMax(null);
            }
            $authorizedChangeDffmiZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeDffmiZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeDffmiZbMaxColor) {
                $entity->setDffmiZbMaxColor(null);
            }
            $authorizedChangeDffmiZcMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeDffmiZcMax = true;
                    }
                }
            }
            if (!$authorizedChangeDffmiZcMax) {
                $entity->setDffmiZcMax(null);
            }
            $authorizedChangeDffmiZcMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeDffmiZcMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeDffmiZcMaxColor) {
                $entity->setDffmiZcMaxColor(null);
            }
            $authorizedChangeDffmiZdMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeDffmiZdMax = true;
                    }
                }
            }
            if (!$authorizedChangeDffmiZdMax) {
                $entity->setDffmiZdMax(null);
            }
            $authorizedChangeDffmiZdMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeDffmiZdMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeDffmiZdMaxColor) {
                $entity->setDffmiZdMaxColor(null);
            }
            $authorizedChangeDffmiZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeDffmiZone = true;
                    }
                }
            }
            if (!$authorizedChangeDffmiZone) {
                $entity->setDffmiZone(null);
            }
            $authorizedChangeMpMetai = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMpMetai = true;
                    }
                }
            }
            if (!$authorizedChangeMpMetai) {
                $entity->setMpMetai(null);
            }
            $authorizedChangeMpMetaiStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMpMetaiStdA = true;
                    }
                }
            }
            if (!$authorizedChangeMpMetaiStdA) {
                $entity->setMpMetaiStdA(null);
            }
            $authorizedChangeMpMetaiStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMpMetaiStdB = true;
                    }
                }
            }
            if (!$authorizedChangeMpMetaiStdB) {
                $entity->setMpMetaiStdB(null);
            }
            $authorizedChangeMpMetaiStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMpMetaiStdC = true;
                    }
                }
            }
            if (!$authorizedChangeMpMetaiStdC) {
                $entity->setMpMetaiStdC(null);
            }
            $authorizedChangeMpMetaiStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMpMetaiStdD = true;
                    }
                }
            }
            if (!$authorizedChangeMpMetaiStdD) {
                $entity->setMpMetaiStdD(null);
            }
            $authorizedChangeMpMetaiZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMpMetaiZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeMpMetaiZaMax) {
                $entity->setMpMetaiZaMax(null);
            }
            $authorizedChangeMpMetaiZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMpMetaiZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeMpMetaiZaMaxColor) {
                $entity->setMpMetaiZaMaxColor(null);
            }
            $authorizedChangeMpMetaiZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMpMetaiZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeMpMetaiZbMax) {
                $entity->setMpMetaiZbMax(null);
            }
            $authorizedChangeMpMetaiZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMpMetaiZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeMpMetaiZbMaxColor) {
                $entity->setMpMetaiZbMaxColor(null);
            }
            $authorizedChangeMpMetaiZcMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMpMetaiZcMax = true;
                    }
                }
            }
            if (!$authorizedChangeMpMetaiZcMax) {
                $entity->setMpMetaiZcMax(null);
            }
            $authorizedChangeMpMetaiZcMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMpMetaiZcMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeMpMetaiZcMaxColor) {
                $entity->setMpMetaiZcMaxColor(null);
            }
            $authorizedChangeMpMetaiZdMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMpMetaiZdMax = true;
                    }
                }
            }
            if (!$authorizedChangeMpMetaiZdMax) {
                $entity->setMpMetaiZdMax(null);
            }
            $authorizedChangeMpMetaiZdMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMpMetaiZdMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeMpMetaiZdMaxColor) {
                $entity->setMpMetaiZdMaxColor(null);
            }
            $authorizedChangeMpMetaiZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMpMetaiZone = true;
                    }
                }
            }
            if (!$authorizedChangeMpMetaiZone) {
                $entity->setMpMetaiZone(null);
            }
            $authorizedChangeFfmi = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfmi = true;
                    }
                }
            }
            if (!$authorizedChangeFfmi) {
                $entity->setFfmi(null);
            }
            $authorizedChangeFfmiRef = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfmiRef = true;
                    }
                }
            }
            if (!$authorizedChangeFfmiRef) {
                $entity->setFfmiRef(null);
            }
            $authorizedChangeFfmRefKg = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfmRefKg = true;
                    }
                }
            }
            if (!$authorizedChangeFfmRefKg) {
                $entity->setFfmRefKg(null);
            }
            $authorizedChangeIffmi = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIffmi = true;
                    }
                }
            }
            if (!$authorizedChangeIffmi) {
                $entity->setIffmi(null);
            }
            $authorizedChangeIffmiStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIffmiStdA = true;
                    }
                }
            }
            if (!$authorizedChangeIffmiStdA) {
                $entity->setIffmiStdA(null);
            }
            $authorizedChangeIffmiStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIffmiStdB = true;
                    }
                }
            }
            if (!$authorizedChangeIffmiStdB) {
                $entity->setIffmiStdB(null);
            }
            $authorizedChangeIffmiStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIffmiStdC = true;
                    }
                }
            }
            if (!$authorizedChangeIffmiStdC) {
                $entity->setIffmiStdC(null);
            }
            $authorizedChangeIffmiStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIffmiStdD = true;
                    }
                }
            }
            if (!$authorizedChangeIffmiStdD) {
                $entity->setIffmiStdD(null);
            }
            $authorizedChangeIffmiZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIffmiZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeIffmiZaMax) {
                $entity->setIffmiZaMax(null);
            }
            $authorizedChangeIffmiZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIffmiZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeIffmiZaMaxColor) {
                $entity->setIffmiZaMaxColor(null);
            }
            $authorizedChangeIffmiZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIffmiZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeIffmiZbMax) {
                $entity->setIffmiZbMax(null);
            }
            $authorizedChangeIffmiZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIffmiZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeIffmiZbMaxColor) {
                $entity->setIffmiZbMaxColor(null);
            }
            $authorizedChangeIffmiZcMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIffmiZcMax = true;
                    }
                }
            }
            if (!$authorizedChangeIffmiZcMax) {
                $entity->setIffmiZcMax(null);
            }
            $authorizedChangeIffmiZcMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIffmiZcMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeIffmiZcMaxColor) {
                $entity->setIffmiZcMaxColor(null);
            }
            $authorizedChangeIffmiZdMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIffmiZdMax = true;
                    }
                }
            }
            if (!$authorizedChangeIffmiZdMax) {
                $entity->setIffmiZdMax(null);
            }
            $authorizedChangeIffmiZdMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIffmiZdMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeIffmiZdMaxColor) {
                $entity->setIffmiZdMaxColor(null);
            }
            $authorizedChangeIffmiZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIffmiZone = true;
                    }
                }
            }
            if (!$authorizedChangeIffmiZone) {
                $entity->setIffmiZone(null);
            }
            $authorizedChangeBmri = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmri = true;
                    }
                }
            }
            if (!$authorizedChangeBmri) {
                $entity->setBmri(null);
            }
            $authorizedChangeBmriStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmriStdA = true;
                    }
                }
            }
            if (!$authorizedChangeBmriStdA) {
                $entity->setBmriStdA(null);
            }
            $authorizedChangeBmriStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmriStdB = true;
                    }
                }
            }
            if (!$authorizedChangeBmriStdB) {
                $entity->setBmriStdB(null);
            }
            $authorizedChangeBmriStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmriStdC = true;
                    }
                }
            }
            if (!$authorizedChangeBmriStdC) {
                $entity->setBmriStdC(null);
            }
            $authorizedChangeBmriStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmriStdD = true;
                    }
                }
            }
            if (!$authorizedChangeBmriStdD) {
                $entity->setBmriStdD(null);
            }
            $authorizedChangeBmriZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmriZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeBmriZaMax) {
                $entity->setBmriZaMax(null);
            }
            $authorizedChangeBmriZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmriZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeBmriZaMaxColor) {
                $entity->setBmriZaMaxColor(null);
            }
            $authorizedChangeBmriZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmriZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeBmriZbMax) {
                $entity->setBmriZbMax(null);
            }
            $authorizedChangeBmriZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmriZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeBmriZbMaxColor) {
                $entity->setBmriZbMaxColor(null);
            }
            $authorizedChangeBmriZcMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmriZcMax = true;
                    }
                }
            }
            if (!$authorizedChangeBmriZcMax) {
                $entity->setBmriZcMax(null);
            }
            $authorizedChangeBmriZcMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmriZcMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeBmriZcMaxColor) {
                $entity->setBmriZcMaxColor(null);
            }
            $authorizedChangeBmriZdMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmriZdMax = true;
                    }
                }
            }
            if (!$authorizedChangeBmriZdMax) {
                $entity->setBmriZdMax(null);
            }
            $authorizedChangeBmriZdMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmriZdMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeBmriZdMaxColor) {
                $entity->setBmriZdMaxColor(null);
            }
            $authorizedChangeBmriZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmriZone = true;
                    }
                }
            }
            if (!$authorizedChangeBmriZone) {
                $entity->setBmriZone(null);
            }
            $authorizedChangeFfecwPc100 = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPc100 = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPc100) {
                $entity->setFfecwPc100(null);
            }
            $authorizedChangeFfecwi = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwi = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwi) {
                $entity->setFfecwi(null);
            }
            $authorizedChangeFfecwPcStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcStdA = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcStdA) {
                $entity->setFfecwPcStdA(null);
            }
            $authorizedChangeFfecwPcStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcStdB = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcStdB) {
                $entity->setFfecwPcStdB(null);
            }
            $authorizedChangeFfecwPcStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcStdC = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcStdC) {
                $entity->setFfecwPcStdC(null);
            }
            $authorizedChangeFfecwPcStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcStdD = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcStdD) {
                $entity->setFfecwPcStdD(null);
            }
            $authorizedChangeFfecwPcStdE = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcStdE = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcStdE) {
                $entity->setFfecwPcStdE(null);
            }
            $authorizedChangeFfecwPcStdF = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcStdF = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcStdF) {
                $entity->setFfecwPcStdF(null);
            }
            $authorizedChangeFfecwPcStdG = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcStdG = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcStdG) {
                $entity->setFfecwPcStdG(null);
            }
            $authorizedChangeFfecwiStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwiStdA = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwiStdA) {
                $entity->setFfecwiStdA(null);
            }
            $authorizedChangeFfecwiStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwiStdB = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwiStdB) {
                $entity->setFfecwiStdB(null);
            }
            $authorizedChangeFfecwiStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwiStdC = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwiStdC) {
                $entity->setFfecwiStdC(null);
            }
            $authorizedChangeFfecwiStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwiStdD = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwiStdD) {
                $entity->setFfecwiStdD(null);
            }
            $authorizedChangeFfecwiStdE = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwiStdE = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwiStdE) {
                $entity->setFfecwiStdE(null);
            }
            $authorizedChangeFfecwiStdF = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwiStdF = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwiStdF) {
                $entity->setFfecwiStdF(null);
            }
            $authorizedChangeFfecwiStdG = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwiStdG = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwiStdG) {
                $entity->setFfecwiStdG(null);
            }
            $authorizedChangeFfecwPcZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcZaMax) {
                $entity->setFfecwPcZaMax(null);
            }
            $authorizedChangeFfecwPcZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcZaMaxColor) {
                $entity->setFfecwPcZaMaxColor(null);
            }
            $authorizedChangeFfecwPcZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcZbMax) {
                $entity->setFfecwPcZbMax(null);
            }
            $authorizedChangeFfecwPcZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcZbMaxColor) {
                $entity->setFfecwPcZbMaxColor(null);
            }
            $authorizedChangeFfecwPcZcMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcZcMax = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcZcMax) {
                $entity->setFfecwPcZcMax(null);
            }
            $authorizedChangeFfecwPcZcMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcZcMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcZcMaxColor) {
                $entity->setFfecwPcZcMaxColor(null);
            }
            $authorizedChangeFfecwPcZdMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcZdMax = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcZdMax) {
                $entity->setFfecwPcZdMax(null);
            }
            $authorizedChangeFfecwPcZdMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcZdMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcZdMaxColor) {
                $entity->setFfecwPcZdMaxColor(null);
            }
            $authorizedChangeFfecwPcZeMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcZeMax = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcZeMax) {
                $entity->setFfecwPcZeMax(null);
            }
            $authorizedChangeFfecwPcZeMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcZeMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcZeMaxColor) {
                $entity->setFfecwPcZeMaxColor(null);
            }
            $authorizedChangeFfecwPcZfMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcZfMax = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcZfMax) {
                $entity->setFfecwPcZfMax(null);
            }
            $authorizedChangeFfecwPcZfMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcZfMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcZfMaxColor) {
                $entity->setFfecwPcZfMaxColor(null);
            }
            $authorizedChangeFfecwPcZgMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcZgMax = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcZgMax) {
                $entity->setFfecwPcZgMax(null);
            }
            $authorizedChangeFfecwPcZgMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcZgMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcZgMaxColor) {
                $entity->setFfecwPcZgMaxColor(null);
            }
            $authorizedChangeFfecwPcZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcZone = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcZone) {
                $entity->setFfecwPcZone(null);
            }
            $authorizedChangeFficwPc100 = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPc100 = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPc100) {
                $entity->setFficwPc100(null);
            }
            $authorizedChangeFficwi = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwi = true;
                    }
                }
            }
            if (!$authorizedChangeFficwi) {
                $entity->setFficwi(null);
            }
            $authorizedChangeFficwPcStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcStdA = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcStdA) {
                $entity->setFficwPcStdA(null);
            }
            $authorizedChangeFficwPcStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcStdB = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcStdB) {
                $entity->setFficwPcStdB(null);
            }
            $authorizedChangeFficwPcStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcStdC = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcStdC) {
                $entity->setFficwPcStdC(null);
            }
            $authorizedChangeFficwPcStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcStdD = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcStdD) {
                $entity->setFficwPcStdD(null);
            }
            $authorizedChangeFficwPcStdE = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcStdE = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcStdE) {
                $entity->setFficwPcStdE(null);
            }
            $authorizedChangeFficwPcStdF = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcStdF = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcStdF) {
                $entity->setFficwPcStdF(null);
            }
            $authorizedChangeFficwPcStdG = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcStdG = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcStdG) {
                $entity->setFficwPcStdG(null);
            }
            $authorizedChangeFficwiStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwiStdA = true;
                    }
                }
            }
            if (!$authorizedChangeFficwiStdA) {
                $entity->setFficwiStdA(null);
            }
            $authorizedChangeFficwiStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwiStdB = true;
                    }
                }
            }
            if (!$authorizedChangeFficwiStdB) {
                $entity->setFficwiStdB(null);
            }
            $authorizedChangeFficwiStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwiStdC = true;
                    }
                }
            }
            if (!$authorizedChangeFficwiStdC) {
                $entity->setFficwiStdC(null);
            }
            $authorizedChangeFficwiStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwiStdD = true;
                    }
                }
            }
            if (!$authorizedChangeFficwiStdD) {
                $entity->setFficwiStdD(null);
            }
            $authorizedChangeFficwiStdE = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwiStdE = true;
                    }
                }
            }
            if (!$authorizedChangeFficwiStdE) {
                $entity->setFficwiStdE(null);
            }
            $authorizedChangeFficwiStdF = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwiStdF = true;
                    }
                }
            }
            if (!$authorizedChangeFficwiStdF) {
                $entity->setFficwiStdF(null);
            }
            $authorizedChangeFficwiStdG = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwiStdG = true;
                    }
                }
            }
            if (!$authorizedChangeFficwiStdG) {
                $entity->setFficwiStdG(null);
            }
            $authorizedChangeFficwPcZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcZaMax) {
                $entity->setFficwPcZaMax(null);
            }
            $authorizedChangeFficwPcZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcZaMaxColor) {
                $entity->setFficwPcZaMaxColor(null);
            }
            $authorizedChangeFficwPcZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcZbMax) {
                $entity->setFficwPcZbMax(null);
            }
            $authorizedChangeFficwPcZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcZbMaxColor) {
                $entity->setFficwPcZbMaxColor(null);
            }
            $authorizedChangeFficwPcZcMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcZcMax = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcZcMax) {
                $entity->setFficwPcZcMax(null);
            }
            $authorizedChangeFficwPcZcMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcZcMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcZcMaxColor) {
                $entity->setFficwPcZcMaxColor(null);
            }
            $authorizedChangeFficwPcZdMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcZdMax = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcZdMax) {
                $entity->setFficwPcZdMax(null);
            }
            $authorizedChangeFficwPcZdMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcZdMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcZdMaxColor) {
                $entity->setFficwPcZdMaxColor(null);
            }
            $authorizedChangeFficwPcZeMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcZeMax = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcZeMax) {
                $entity->setFficwPcZeMax(null);
            }
            $authorizedChangeFficwPcZeMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcZeMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcZeMaxColor) {
                $entity->setFficwPcZeMaxColor(null);
            }
            $authorizedChangeFficwPcZfMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcZfMax = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcZfMax) {
                $entity->setFficwPcZfMax(null);
            }
            $authorizedChangeFficwPcZfMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcZfMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcZfMaxColor) {
                $entity->setFficwPcZfMaxColor(null);
            }
            $authorizedChangeFficwPcZgMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcZgMax = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcZgMax) {
                $entity->setFficwPcZgMax(null);
            }
            $authorizedChangeFficwPcZgMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcZgMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcZgMaxColor) {
                $entity->setFficwPcZgMaxColor(null);
            }
            $authorizedChangeFficwPcZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcZone = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcZone) {
                $entity->setFficwPcZone(null);
            }
            $authorizedChangeAsmhiStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmhiStdA = true;
                    }
                }
            }
            if (!$authorizedChangeAsmhiStdA) {
                $entity->setAsmhiStdA(null);
            }
            $authorizedChangeAsmhiStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmhiStdB = true;
                    }
                }
            }
            if (!$authorizedChangeAsmhiStdB) {
                $entity->setAsmhiStdB(null);
            }
            $authorizedChangeAsmhiStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmhiStdC = true;
                    }
                }
            }
            if (!$authorizedChangeAsmhiStdC) {
                $entity->setAsmhiStdC(null);
            }
            $authorizedChangeAsmhiStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmhiStdD = true;
                    }
                }
            }
            if (!$authorizedChangeAsmhiStdD) {
                $entity->setAsmhiStdD(null);
            }
            $authorizedChangeAsmhiZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmhiZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeAsmhiZaMax) {
                $entity->setAsmhiZaMax(null);
            }
            $authorizedChangeAsmhiZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmhiZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeAsmhiZaMaxColor) {
                $entity->setAsmhiZaMaxColor(null);
            }
            $authorizedChangeAsmhiZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmhiZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeAsmhiZbMax) {
                $entity->setAsmhiZbMax(null);
            }
            $authorizedChangeAsmhiZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmhiZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeAsmhiZbMaxColor) {
                $entity->setAsmhiZbMaxColor(null);
            }
            $authorizedChangeAsmhiZcMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmhiZcMax = true;
                    }
                }
            }
            if (!$authorizedChangeAsmhiZcMax) {
                $entity->setAsmhiZcMax(null);
            }
            $authorizedChangeAsmhiZcMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmhiZcMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeAsmhiZcMaxColor) {
                $entity->setAsmhiZcMaxColor(null);
            }
            $authorizedChangeAsmhiZdMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmhiZdMax = true;
                    }
                }
            }
            if (!$authorizedChangeAsmhiZdMax) {
                $entity->setAsmhiZdMax(null);
            }
            $authorizedChangeAsmhiZdMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmhiZdMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeAsmhiZdMaxColor) {
                $entity->setAsmhiZdMaxColor(null);
            }
            $authorizedChangeAsmhiZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmhiZone = true;
                    }
                }
            }
            if (!$authorizedChangeAsmhiZone) {
                $entity->setAsmhiZone(null);
            }
            $authorizedChangeBcmi = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBcmi = true;
                    }
                }
            }
            if (!$authorizedChangeBcmi) {
                $entity->setBcmi(null);
            }
            $authorizedChangeBcmiStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBcmiStdA = true;
                    }
                }
            }
            if (!$authorizedChangeBcmiStdA) {
                $entity->setBcmiStdA(null);
            }
            $authorizedChangeBcmiStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBcmiStdB = true;
                    }
                }
            }
            if (!$authorizedChangeBcmiStdB) {
                $entity->setBcmiStdB(null);
            }
            $authorizedChangeBcmiStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBcmiStdC = true;
                    }
                }
            }
            if (!$authorizedChangeBcmiStdC) {
                $entity->setBcmiStdC(null);
            }
            $authorizedChangeBcmiStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBcmiStdD = true;
                    }
                }
            }
            if (!$authorizedChangeBcmiStdD) {
                $entity->setBcmiStdD(null);
            }
            $authorizedChangeBcmiZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBcmiZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeBcmiZaMax) {
                $entity->setBcmiZaMax(null);
            }
            $authorizedChangeBcmiZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBcmiZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeBcmiZaMaxColor) {
                $entity->setBcmiZaMaxColor(null);
            }
            $authorizedChangeBcmiZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBcmiZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeBcmiZbMax) {
                $entity->setBcmiZbMax(null);
            }
            $authorizedChangeBcmiZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBcmiZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeBcmiZbMaxColor) {
                $entity->setBcmiZbMaxColor(null);
            }
            $authorizedChangeBcmiZcMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBcmiZcMax = true;
                    }
                }
            }
            if (!$authorizedChangeBcmiZcMax) {
                $entity->setBcmiZcMax(null);
            }
            $authorizedChangeBcmiZcMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBcmiZcMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeBcmiZcMaxColor) {
                $entity->setBcmiZcMaxColor(null);
            }
            $authorizedChangeBcmiZdMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBcmiZdMax = true;
                    }
                }
            }
            if (!$authorizedChangeBcmiZdMax) {
                $entity->setBcmiZdMax(null);
            }
            $authorizedChangeBcmiZdMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBcmiZdMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeBcmiZdMaxColor) {
                $entity->setBcmiZdMaxColor(null);
            }
            $authorizedChangeBcmiZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBcmiZone = true;
                    }
                }
            }
            if (!$authorizedChangeBcmiZone) {
                $entity->setBcmiZone(null);
            }
            $authorizedChangeImcNorms = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcNorms = true;
                    }
                }
            }
            if (!$authorizedChangeImcNorms) {
                $entity->setImcNorms(null);
            }
            $authorizedChangeImcStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcStdA = true;
                    }
                }
            }
            if (!$authorizedChangeImcStdA) {
                $entity->setImcStdA(null);
            }
            $authorizedChangeImcStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcStdB = true;
                    }
                }
            }
            if (!$authorizedChangeImcStdB) {
                $entity->setImcStdB(null);
            }
            $authorizedChangeImcStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcStdC = true;
                    }
                }
            }
            if (!$authorizedChangeImcStdC) {
                $entity->setImcStdC(null);
            }
            $authorizedChangeImcStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcStdD = true;
                    }
                }
            }
            if (!$authorizedChangeImcStdD) {
                $entity->setImcStdD(null);
            }
            $authorizedChangeImcStdE = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcStdE = true;
                    }
                }
            }
            if (!$authorizedChangeImcStdE) {
                $entity->setImcStdE(null);
            }
            $authorizedChangeImcStdF = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcStdF = true;
                    }
                }
            }
            if (!$authorizedChangeImcStdF) {
                $entity->setImcStdF(null);
            }
            $authorizedChangeImcStdG = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcStdG = true;
                    }
                }
            }
            if (!$authorizedChangeImcStdG) {
                $entity->setImcStdG(null);
            }
            $authorizedChangeImcZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeImcZaMax) {
                $entity->setImcZaMax(null);
            }
            $authorizedChangeImcZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeImcZaMaxColor) {
                $entity->setImcZaMaxColor(null);
            }
            $authorizedChangeImcZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeImcZbMax) {
                $entity->setImcZbMax(null);
            }
            $authorizedChangeImcZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeImcZbMaxColor) {
                $entity->setImcZbMaxColor(null);
            }
            $authorizedChangeImcZcMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcZcMax = true;
                    }
                }
            }
            if (!$authorizedChangeImcZcMax) {
                $entity->setImcZcMax(null);
            }
            $authorizedChangeImcZcMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcZcMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeImcZcMaxColor) {
                $entity->setImcZcMaxColor(null);
            }
            $authorizedChangeImcZdMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcZdMax = true;
                    }
                }
            }
            if (!$authorizedChangeImcZdMax) {
                $entity->setImcZdMax(null);
            }
            $authorizedChangeImcZdMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcZdMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeImcZdMaxColor) {
                $entity->setImcZdMaxColor(null);
            }
            $authorizedChangeImcZeMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcZeMax = true;
                    }
                }
            }
            if (!$authorizedChangeImcZeMax) {
                $entity->setImcZeMax(null);
            }
            $authorizedChangeImcZeMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcZeMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeImcZeMaxColor) {
                $entity->setImcZeMaxColor(null);
            }
            $authorizedChangeImcZfMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcZfMax = true;
                    }
                }
            }
            if (!$authorizedChangeImcZfMax) {
                $entity->setImcZfMax(null);
            }
            $authorizedChangeImcZfMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcZfMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeImcZfMaxColor) {
                $entity->setImcZfMaxColor(null);
            }
            $authorizedChangeImcZgMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcZgMax = true;
                    }
                }
            }
            if (!$authorizedChangeImcZgMax) {
                $entity->setImcZgMax(null);
            }
            $authorizedChangeImcZgMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcZgMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeImcZgMaxColor) {
                $entity->setImcZgMaxColor(null);
            }
            $authorizedChangeImcZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcZone = true;
                    }
                }
            }
            if (!$authorizedChangeImcZone) {
                $entity->setImcZone(null);
            }
            $authorizedChangeFmslmirZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmslmirZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeFmslmirZaMax) {
                $entity->setFmslmirZaMax(null);
            }
            $authorizedChangeFmslmirZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmslmirZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFmslmirZaMaxColor) {
                $entity->setFmslmirZaMaxColor(null);
            }
            $authorizedChangeFmslmirZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmslmirZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeFmslmirZbMax) {
                $entity->setFmslmirZbMax(null);
            }
            $authorizedChangeFmslmirZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmslmirZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFmslmirZbMaxColor) {
                $entity->setFmslmirZbMaxColor(null);
            }
            $authorizedChangeFmslmirZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmslmirZone = true;
                    }
                }
            }
            if (!$authorizedChangeFmslmirZone) {
                $entity->setFmslmirZone(null);
            }
            $authorizedChangeFmirZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmirZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeFmirZaMax) {
                $entity->setFmirZaMax(null);
            }
            $authorizedChangeFmirZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmirZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFmirZaMaxColor) {
                $entity->setFmirZaMaxColor(null);
            }
            $authorizedChangeFmirZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmirZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeFmirZbMax) {
                $entity->setFmirZbMax(null);
            }
            $authorizedChangeFmirZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmirZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeFmirZbMaxColor) {
                $entity->setFmirZbMaxColor(null);
            }
            $authorizedChangeFmirZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmirZone = true;
                    }
                }
            }
            if (!$authorizedChangeFmirZone) {
                $entity->setFmirZone(null);
            }
            $authorizedChangeSlmirZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeSlmirZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeSlmirZaMax) {
                $entity->setSlmirZaMax(null);
            }
            $authorizedChangeSlmirZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeSlmirZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeSlmirZaMaxColor) {
                $entity->setSlmirZaMaxColor(null);
            }
            $authorizedChangeSlmirZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeSlmirZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeSlmirZbMax) {
                $entity->setSlmirZbMax(null);
            }
            $authorizedChangeSlmirZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeSlmirZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeSlmirZbMaxColor) {
                $entity->setSlmirZbMaxColor(null);
            }
            $authorizedChangeSlmirZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeSlmirZone = true;
                    }
                }
            }
            if (!$authorizedChangeSlmirZone) {
                $entity->setSlmirZone(null);
            }
            $authorizedChangeWhrZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeWhrZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeWhrZaMax) {
                $entity->setWhrZaMax(null);
            }
            $authorizedChangeWhrZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeWhrZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeWhrZaMaxColor) {
                $entity->setWhrZaMaxColor(null);
            }
            $authorizedChangeWhrZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeWhrZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeWhrZbMax) {
                $entity->setWhrZbMax(null);
            }
            $authorizedChangeWhrZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeWhrZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeWhrZbMaxColor) {
                $entity->setWhrZbMaxColor(null);
            }
            $authorizedChangeWhrZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeWhrZone = true;
                    }
                }
            }
            if (!$authorizedChangeWhrZone) {
                $entity->setWhrZone(null);
            }
            $authorizedChangeWhtrZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeWhtrZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeWhtrZaMax) {
                $entity->setWhtrZaMax(null);
            }
            $authorizedChangeWhtrZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeWhtrZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeWhtrZaMaxColor) {
                $entity->setWhtrZaMaxColor(null);
            }
            $authorizedChangeWhtrZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeWhtrZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeWhtrZbMax) {
                $entity->setWhtrZbMax(null);
            }
            $authorizedChangeWhtrZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeWhtrZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeWhtrZbMaxColor) {
                $entity->setWhtrZbMaxColor(null);
            }
            $authorizedChangeWhtrZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeWhtrZone = true;
                    }
                }
            }
            if (!$authorizedChangeWhtrZone) {
                $entity->setWhtrZone(null);
            }
            $authorizedChangeTotalCcScZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalCcScZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeTotalCcScZaMax) {
                $entity->setTotalCcScZaMax(null);
            }
            $authorizedChangeTotalCcScZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalCcScZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeTotalCcScZaMaxColor) {
                $entity->setTotalCcScZaMaxColor(null);
            }
            $authorizedChangeTotalCcScZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalCcScZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeTotalCcScZbMax) {
                $entity->setTotalCcScZbMax(null);
            }
            $authorizedChangeTotalCcScZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalCcScZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeTotalCcScZbMaxColor) {
                $entity->setTotalCcScZbMaxColor(null);
            }
            $authorizedChangeTotalCcScZcMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalCcScZcMax = true;
                    }
                }
            }
            if (!$authorizedChangeTotalCcScZcMax) {
                $entity->setTotalCcScZcMax(null);
            }
            $authorizedChangeTotalCcScZcMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalCcScZcMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeTotalCcScZcMaxColor) {
                $entity->setTotalCcScZcMaxColor(null);
            }
            $authorizedChangeTotalCcScZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalCcScZone = true;
                    }
                }
            }
            if (!$authorizedChangeTotalCcScZone) {
                $entity->setTotalCcScZone(null);
            }
            $authorizedChangeTotalMuhScZaMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalMuhScZaMax = true;
                    }
                }
            }
            if (!$authorizedChangeTotalMuhScZaMax) {
                $entity->setTotalMuhScZaMax(null);
            }
            $authorizedChangeTotalMuhScZaMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalMuhScZaMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeTotalMuhScZaMaxColor) {
                $entity->setTotalMuhScZaMaxColor(null);
            }
            $authorizedChangeTotalMuhScZbMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalMuhScZbMax = true;
                    }
                }
            }
            if (!$authorizedChangeTotalMuhScZbMax) {
                $entity->setTotalMuhScZbMax(null);
            }
            $authorizedChangeTotalMuhScZbMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalMuhScZbMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeTotalMuhScZbMaxColor) {
                $entity->setTotalMuhScZbMaxColor(null);
            }
            $authorizedChangeTotalMuhScZcMax = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalMuhScZcMax = true;
                    }
                }
            }
            if (!$authorizedChangeTotalMuhScZcMax) {
                $entity->setTotalMuhScZcMax(null);
            }
            $authorizedChangeTotalMuhScZcMaxColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalMuhScZcMaxColor = true;
                    }
                }
            }
            if (!$authorizedChangeTotalMuhScZcMaxColor) {
                $entity->setTotalMuhScZcMaxColor(null);
            }
            $authorizedChangeTotalMuhScZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalMuhScZone = true;
                    }
                }
            }
            if (!$authorizedChangeTotalMuhScZone) {
                $entity->setTotalMuhScZone(null);
            }
            $authorizedChangeCibleZaColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleZaColor = true;
                    }
                }
            }
            if (!$authorizedChangeCibleZaColor) {
                $entity->setCibleZaColor(null);
            }
            $authorizedChangeCibleZbColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleZbColor = true;
                    }
                }
            }
            if (!$authorizedChangeCibleZbColor) {
                $entity->setCibleZbColor(null);
            }
            $authorizedChangeCibleZcColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleZcColor = true;
                    }
                }
            }
            if (!$authorizedChangeCibleZcColor) {
                $entity->setCibleZcColor(null);
            }
            $authorizedChangeCibleZdColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleZdColor = true;
                    }
                }
            }
            if (!$authorizedChangeCibleZdColor) {
                $entity->setCibleZdColor(null);
            }
            $authorizedChangeCibleZeColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleZeColor = true;
                    }
                }
            }
            if (!$authorizedChangeCibleZeColor) {
                $entity->setCibleZeColor(null);
            }
            $authorizedChangeCibleZfColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleZfColor = true;
                    }
                }
            }
            if (!$authorizedChangeCibleZfColor) {
                $entity->setCibleZfColor(null);
            }
            $authorizedChangeCibleZone = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleZone = true;
                    }
                }
            }
            if (!$authorizedChangeCibleZone) {
                $entity->setCibleZone(null);
            }
            $authorizedChangeCiblePoint = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCiblePoint = true;
                    }
                }
            }
            if (!$authorizedChangeCiblePoint) {
                $entity->setCiblePoint(null);
            }
            $authorizedChangeCibleIcwPcStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleIcwPcStdB = true;
                    }
                }
            }
            if (!$authorizedChangeCibleIcwPcStdB) {
                $entity->setCibleIcwPcStdB(null);
            }
            $authorizedChangeCibleIcwPcStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleIcwPcStdC = true;
                    }
                }
            }
            if (!$authorizedChangeCibleIcwPcStdC) {
                $entity->setCibleIcwPcStdC(null);
            }
            $authorizedChangeCibleIcwPcStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleIcwPcStdD = true;
                    }
                }
            }
            if (!$authorizedChangeCibleIcwPcStdD) {
                $entity->setCibleIcwPcStdD(null);
            }
            $authorizedChangeCibleIcwPcStdE = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleIcwPcStdE = true;
                    }
                }
            }
            if (!$authorizedChangeCibleIcwPcStdE) {
                $entity->setCibleIcwPcStdE(null);
            }
            $authorizedChangeCibleFmHcPcStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleFmHcPcStdA = true;
                    }
                }
            }
            if (!$authorizedChangeCibleFmHcPcStdA) {
                $entity->setCibleFmHcPcStdA(null);
            }
            $authorizedChangeCibleFmHcPcStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleFmHcPcStdB = true;
                    }
                }
            }
            if (!$authorizedChangeCibleFmHcPcStdB) {
                $entity->setCibleFmHcPcStdB(null);
            }
            $authorizedChangeCibleFmHcPcStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleFmHcPcStdC = true;
                    }
                }
            }
            if (!$authorizedChangeCibleFmHcPcStdC) {
                $entity->setCibleFmHcPcStdC(null);
            }
            $authorizedChangeCibleFmHcPcStdE = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleFmHcPcStdE = true;
                    }
                }
            }
            if (!$authorizedChangeCibleFmHcPcStdE) {
                $entity->setCibleFmHcPcStdE(null);
            }
            $authorizedChangeCibleFfwStdA = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleFfwStdA = true;
                    }
                }
            }
            if (!$authorizedChangeCibleFfwStdA) {
                $entity->setCibleFfwStdA(null);
            }
            $authorizedChangeCibleFfwStdB = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleFfwStdB = true;
                    }
                }
            }
            if (!$authorizedChangeCibleFfwStdB) {
                $entity->setCibleFfwStdB(null);
            }
            $authorizedChangeCibleFfwStdC = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleFfwStdC = true;
                    }
                }
            }
            if (!$authorizedChangeCibleFfwStdC) {
                $entity->setCibleFfwStdC(null);
            }
            $authorizedChangeCibleFfwStdD = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleFfwStdD = true;
                    }
                }
            }
            if (!$authorizedChangeCibleFfwStdD) {
                $entity->setCibleFfwStdD(null);
            }
            $authorizedChangeFmHcPcPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmHcPcPos = true;
                    }
                }
            }
            if (!$authorizedChangeFmHcPcPos) {
                $entity->setFmHcPcPos(null);
            }
            $authorizedChangeFfwPcPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfwPcPos = true;
                    }
                }
            }
            if (!$authorizedChangeFfwPcPos) {
                $entity->setFfwPcPos(null);
            }
            $authorizedChangeMmhiPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMmhiPos = true;
                    }
                }
            }
            if (!$authorizedChangeMmhiPos) {
                $entity->setMmhiPos(null);
            }
            $authorizedChangeAdcrPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAdcrPos = true;
                    }
                }
            }
            if (!$authorizedChangeAdcrPos) {
                $entity->setAdcrPos(null);
            }
            $authorizedChangeAdcrConsInf = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAdcrConsInf = true;
                    }
                }
            }
            if (!$authorizedChangeAdcrConsInf) {
                $entity->setAdcrConsInf(null);
            }
            $authorizedChangeAdcrConsSup = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAdcrConsSup = true;
                    }
                }
            }
            if (!$authorizedChangeAdcrConsSup) {
                $entity->setAdcrConsSup(null);
            }
            $authorizedChangeAsmmiPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmmiPos = true;
                    }
                }
            }
            if (!$authorizedChangeAsmmiPos) {
                $entity->setAsmmiPos(null);
            }
            $authorizedChangeEcwPcPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeEcwPcPos = true;
                    }
                }
            }
            if (!$authorizedChangeEcwPcPos) {
                $entity->setEcwPcPos(null);
            }
            $authorizedChangeIcwPcPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIcwPcPos = true;
                    }
                }
            }
            if (!$authorizedChangeIcwPcPos) {
                $entity->setIcwPcPos(null);
            }
            $authorizedChangeFmPcPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmPcPos = true;
                    }
                }
            }
            if (!$authorizedChangeFmPcPos) {
                $entity->setFmPcPos(null);
            }
            $authorizedChangeTbwffmPcPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTbwffmPcPos = true;
                    }
                }
            }
            if (!$authorizedChangeTbwffmPcPos) {
                $entity->setTbwffmPcPos(null);
            }
            $authorizedChangeDffmiPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeDffmiPos = true;
                    }
                }
            }
            if (!$authorizedChangeDffmiPos) {
                $entity->setDffmiPos(null);
            }
            $authorizedChangeMpMetaiPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeMpMetaiPos = true;
                    }
                }
            }
            if (!$authorizedChangeMpMetaiPos) {
                $entity->setMpMetaiPos(null);
            }
            $authorizedChangeIffmiPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeIffmiPos = true;
                    }
                }
            }
            if (!$authorizedChangeIffmiPos) {
                $entity->setIffmiPos(null);
            }
            $authorizedChangeBmriPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBmriPos = true;
                    }
                }
            }
            if (!$authorizedChangeBmriPos) {
                $entity->setBmriPos(null);
            }
            $authorizedChangeFfecwPcPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwPcPos = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwPcPos) {
                $entity->setFfecwPcPos(null);
            }
            $authorizedChangeFfecwiPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFfecwiPos = true;
                    }
                }
            }
            if (!$authorizedChangeFfecwiPos) {
                $entity->setFfecwiPos(null);
            }
            $authorizedChangeFficwPcPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwPcPos = true;
                    }
                }
            }
            if (!$authorizedChangeFficwPcPos) {
                $entity->setFficwPcPos(null);
            }
            $authorizedChangeFficwiPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFficwiPos = true;
                    }
                }
            }
            if (!$authorizedChangeFficwiPos) {
                $entity->setFficwiPos(null);
            }
            $authorizedChangeAsmhiPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmhiPos = true;
                    }
                }
            }
            if (!$authorizedChangeAsmhiPos) {
                $entity->setAsmhiPos(null);
            }
            $authorizedChangeBcmiPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeBcmiPos = true;
                    }
                }
            }
            if (!$authorizedChangeBcmiPos) {
                $entity->setBcmiPos(null);
            }
            $authorizedChangeImcPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeImcPos = true;
                    }
                }
            }
            if (!$authorizedChangeImcPos) {
                $entity->setImcPos(null);
            }
            $authorizedChangeFmslmirCcSc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmslmirCcSc = true;
                    }
                }
            }
            if (!$authorizedChangeFmslmirCcSc) {
                $entity->setFmslmirCcSc(null);
            }
            $authorizedChangeFmirCcSc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmirCcSc = true;
                    }
                }
            }
            if (!$authorizedChangeFmirCcSc) {
                $entity->setFmirCcSc(null);
            }
            $authorizedChangeSlmirCcSc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeSlmirCcSc = true;
                    }
                }
            }
            if (!$authorizedChangeSlmirCcSc) {
                $entity->setSlmirCcSc(null);
            }
            $authorizedChangeWhrCcSc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeWhrCcSc = true;
                    }
                }
            }
            if (!$authorizedChangeWhrCcSc) {
                $entity->setWhrCcSc(null);
            }
            $authorizedChangeWhtrCcSc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeWhtrCcSc = true;
                    }
                }
            }
            if (!$authorizedChangeWhtrCcSc) {
                $entity->setWhtrCcSc(null);
            }
            $authorizedChangeTotalCcSc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalCcSc = true;
                    }
                }
            }
            if (!$authorizedChangeTotalCcSc) {
                $entity->setTotalCcSc(null);
            }
            $authorizedChangeTotalCcScPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalCcScPos = true;
                    }
                }
            }
            if (!$authorizedChangeTotalCcScPos) {
                $entity->setTotalCcScPos(null);
            }
            $authorizedChangeFmslmirMuhSc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmslmirMuhSc = true;
                    }
                }
            }
            if (!$authorizedChangeFmslmirMuhSc) {
                $entity->setFmslmirMuhSc(null);
            }
            $authorizedChangeFmirMuhSc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeFmirMuhSc = true;
                    }
                }
            }
            if (!$authorizedChangeFmirMuhSc) {
                $entity->setFmirMuhSc(null);
            }
            $authorizedChangeSlmirMuhSc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeSlmirMuhSc = true;
                    }
                }
            }
            if (!$authorizedChangeSlmirMuhSc) {
                $entity->setSlmirMuhSc(null);
            }
            $authorizedChangeTotalMuhSc = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalMuhSc = true;
                    }
                }
            }
            if (!$authorizedChangeTotalMuhSc) {
                $entity->setTotalMuhSc(null);
            }
            $authorizedChangeTotalMuhScPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalMuhScPos = true;
                    }
                }
            }
            if (!$authorizedChangeTotalMuhScPos) {
                $entity->setTotalMuhScPos(null);
            }
            $authorizedChangeCibleIcwPcPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleIcwPcPos = true;
                    }
                }
            }
            if (!$authorizedChangeCibleIcwPcPos) {
                $entity->setCibleIcwPcPos(null);
            }
            $authorizedChangeCibleImcPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleImcPos = true;
                    }
                }
            }
            if (!$authorizedChangeCibleImcPos) {
                $entity->setCibleImcPos(null);
            }
            $authorizedChangeCibleFmHcPcPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleFmHcPcPos = true;
                    }
                }
            }
            if (!$authorizedChangeCibleFmHcPcPos) {
                $entity->setCibleFmHcPcPos(null);
            }
            $authorizedChangeCibleMmhiPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleMmhiPos = true;
                    }
                }
            }
            if (!$authorizedChangeCibleMmhiPos) {
                $entity->setCibleMmhiPos(null);
            }
            $authorizedChangeCibleAsmhiPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleAsmhiPos = true;
                    }
                }
            }
            if (!$authorizedChangeCibleAsmhiPos) {
                $entity->setCibleAsmhiPos(null);
            }
            $authorizedChangeCibleFfwPos = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeCibleFfwPos = true;
                    }
                }
            }
            if (!$authorizedChangeCibleFfwPos) {
                $entity->setCibleFfwPos(null);
            }
            $authorizedChangeAsmliColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmliColor = true;
                    }
                }
            }
            if (!$authorizedChangeAsmliColor) {
                $entity->setAsmliColor(null);
            }
            $authorizedChangeAsmtliColor = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAsmtliColor = true;
                    }
                }
            }
            if (!$authorizedChangeAsmtliColor) {
                $entity->setAsmtliColor(null);
            }
            $authorizedChangeRequest = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeRequest = true;
                    }
                }
            }
            if (!$authorizedChangeRequest) {
                $entity->setRequest(null);
            }
            $authorizedChangeResponse = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeResponse = true;
                    }
                }
            }
            if (!$authorizedChangeResponse) {
                $entity->setResponse(null);
            }
            $em->persist($entity);
            $em->flush();
            return $entity;
        }
    }

    /**
     * Update a Measurement entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function putAction(Request $request, Measurement $entity)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $request->setMethod('PATCH'); //Treat all PUTs as PATCH
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                   if (substr_count($role, 'ACC') > 0) {
                       if ($entity->getCreatorUser()->getId() != $this->getUser()->getId()) {
                           return FOSView::create('Not authorized', Codes::HTTP_FORBIDDEN);
                       }
                   }
                }
            }
            $form = $this->createForm(new MeasurementType(), $entity, array('method' => $request->getMethod()));
            $this->removeExtraFields($request, $form);
            $form->handleRequest($request);
            if ($form->isValid()) {
                $entity->setModifierUser($this->getUser());
                $authorizedChangeDeviceDate = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeDeviceDate = true;
                        }
                    }
                }
                $authorizedChangeBatteryLevel = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBatteryLevel = true;
                        }
                    }
                }
                $authorizedChangeA5 = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeA5 = true;
                        }
                    }
                }
                $authorizedChangeA20 = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeA20 = true;
                        }
                    }
                }
                $authorizedChangeA50 = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeA50 = true;
                        }
                    }
                }
                $authorizedChangeA100 = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeA100 = true;
                        }
                    }
                }
                $authorizedChangeA200 = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeA200 = true;
                        }
                    }
                }
                $authorizedChangeAct = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAct = true;
                        }
                    }
                }
                $authorizedChangeK = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeK = true;
                        }
                    }
                }
                $authorizedChangeEcwPcRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcRef = true;
                        }
                    }
                }
                $authorizedChangeIcwPcRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcRef = true;
                        }
                    }
                }
                $authorizedChangeSmiRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeSmiRef = true;
                        }
                    }
                }
                $authorizedChangeFmirCcRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmirCcRef = true;
                        }
                    }
                }
                $authorizedChangeFmirMuhRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmirMuhRef = true;
                        }
                    }
                }
                $authorizedChangeFmslmirMuhRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmslmirMuhRef = true;
                        }
                    }
                }
                $authorizedChangeFmslmirCcRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmslmirCcRef = true;
                        }
                    }
                }
                $authorizedChangeSlmirMuhRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeSlmirMuhRef = true;
                        }
                    }
                }
                $authorizedChangeSlmirCcRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeSlmirCcRef = true;
                        }
                    }
                }
                $authorizedChangeWhrRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeWhrRef = true;
                        }
                    }
                }
                $authorizedChangeHac = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeHac = true;
                        }
                    }
                }
                $authorizedChangeWac = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeWac = true;
                        }
                    }
                }
                $authorizedChangeA50Radian = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeA50Radian = true;
                        }
                    }
                }
                $authorizedChangeX50 = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeX50 = true;
                        }
                    }
                }
                $authorizedChangeR50 = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeR50 = true;
                        }
                    }
                }
                $authorizedChangeBmrRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmrRef = true;
                        }
                    }
                }
                $authorizedChangeImc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImc = true;
                        }
                    }
                }
                $authorizedChangeImcRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcRef = true;
                        }
                    }
                }
                $authorizedChangeImcRefInf = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcRefInf = true;
                        }
                    }
                }
                $authorizedChangeImcRefSup = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcRefSup = true;
                        }
                    }
                }
                $authorizedChangeFmPcRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcRef = true;
                        }
                    }
                }
                $authorizedChangeTbw = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbw = true;
                        }
                    }
                }
                $authorizedChangeEcw = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcw = true;
                        }
                    }
                }
                $authorizedChangeBmci = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmci = true;
                        }
                    }
                }
                $authorizedChangeFmHcRefKg = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcRefKg = true;
                        }
                    }
                }
                $authorizedChangeFmRefKg = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmRefKg = true;
                        }
                    }
                }
                $authorizedChangeFfmKg = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfmKg = true;
                        }
                    }
                }
                $authorizedChangeFmKg = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmKg = true;
                        }
                    }
                }
                $authorizedChangeFfmPc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfmPc = true;
                        }
                    }
                }
                $authorizedChangeDffmKg = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeDffmKg = true;
                        }
                    }
                }
                $authorizedChangeDffmRefKg = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeDffmRefKg = true;
                        }
                    }
                }
                $authorizedChangeDffmEtKg = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeDffmEtKg = true;
                        }
                    }
                }
                $authorizedChangeAsmmKg = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmmKg = true;
                        }
                    }
                }
                $authorizedChangeAsmmRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmmRef = true;
                        }
                    }
                }
                $authorizedChangeAsmmEt = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmmEt = true;
                        }
                    }
                }
                $authorizedChangeAsmmffmr = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmmffmr = true;
                        }
                    }
                }
                $authorizedChangeTbwPc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwPc = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPc = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcRef = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcEt = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcEt = true;
                        }
                    }
                }
                $authorizedChangeFfwPc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPc = true;
                        }
                    }
                }
                $authorizedChangeFfw = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfw = true;
                        }
                    }
                }
                $authorizedChangeFfwPcRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcRef = true;
                        }
                    }
                }
                $authorizedChangeFfwRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwRef = true;
                        }
                    }
                }
                $authorizedChangeFfwEt = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwEt = true;
                        }
                    }
                }
                $authorizedChangeEcwSpec = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwSpec = true;
                        }
                    }
                }
                $authorizedChangeEcwPc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPc = true;
                        }
                    }
                }
                $authorizedChangeEcwffmPc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwffmPc = true;
                        }
                    }
                }
                $authorizedChangeIcw = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcw = true;
                        }
                    }
                }
                $authorizedChangeIcwPc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPc = true;
                        }
                    }
                }
                $authorizedChangeFficwPcRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcRef = true;
                        }
                    }
                }
                $authorizedChangeFficwRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwRef = true;
                        }
                    }
                }
                $authorizedChangeFfecwRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwRef = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcRef = true;
                        }
                    }
                }
                $authorizedChangeEcwicwPcEt = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwicwPcEt = true;
                        }
                    }
                }
                $authorizedChangeCmo = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCmo = true;
                        }
                    }
                }
                $authorizedChangeSlm = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeSlm = true;
                        }
                    }
                }
                $authorizedChangeMo = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMo = true;
                        }
                    }
                }
                $authorizedChangeEcs = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcs = true;
                        }
                    }
                }
                $authorizedChangeMs = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMs = true;
                        }
                    }
                }
                $authorizedChangeSmi = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeSmi = true;
                        }
                    }
                }
                $authorizedChangeFmiIndiceComp = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmiIndiceComp = true;
                        }
                    }
                }
                $authorizedChangeSlmir = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeSlmir = true;
                        }
                    }
                }
                $authorizedChangeDasmmKg = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeDasmmKg = true;
                        }
                    }
                }
                $authorizedChangeFfeirRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfeirRef = true;
                        }
                    }
                }
                $authorizedChangeBmrRefKjoules = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmrRefKjoules = true;
                        }
                    }
                }
                $authorizedChangeMmsPcRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmsPcRef = true;
                        }
                    }
                }
                $authorizedChangeTbwFm = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwFm = true;
                        }
                    }
                }
                $authorizedChangeZ200z5r = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeZ200z5r = true;
                        }
                    }
                }
                $authorizedChangeWhr = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeWhr = true;
                        }
                    }
                }
                $authorizedChangeWhtr = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeWhtr = true;
                        }
                    }
                }
                $authorizedChangeWhtrRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeWhtrRef = true;
                        }
                    }
                }
                $authorizedChangeBmr = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmr = true;
                        }
                    }
                }
                $authorizedChangeBmrKjoules = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmrKjoules = true;
                        }
                    }
                }
                $authorizedChangeAdcr = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAdcr = true;
                        }
                    }
                }
                $authorizedChangeAdcrKjoules = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAdcrKjoules = true;
                        }
                    }
                }
                $authorizedChangeFmHcPc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPc = true;
                        }
                    }
                }
                $authorizedChangeFmHcKg = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcKg = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcRef = true;
                        }
                    }
                }
                $authorizedChangeFmHcEtKg = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcEtKg = true;
                        }
                    }
                }
                $authorizedChangeFmEtKg = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmEtKg = true;
                        }
                    }
                }
                $authorizedChangeFmPc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPc = true;
                        }
                    }
                }
                $authorizedChangeMmsKg = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmsKg = true;
                        }
                    }
                }
                $authorizedChangeMmsPc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmsPc = true;
                        }
                    }
                }
                $authorizedChangeMmsRefKg = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmsRefKg = true;
                        }
                    }
                }
                $authorizedChangeMmsEtKg = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmsEtKg = true;
                        }
                    }
                }
                $authorizedChangeBcm = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBcm = true;
                        }
                    }
                }
                $authorizedChangeMpMetaKg = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMpMetaKg = true;
                        }
                    }
                }
                $authorizedChangeMpMetaPc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMpMetaPc = true;
                        }
                    }
                }
                $authorizedChangeTbwRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwRef = true;
                        }
                    }
                }
                $authorizedChangeIcwfm = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwfm = true;
                        }
                    }
                }
                $authorizedChangeEcwfm = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwfm = true;
                        }
                    }
                }
                $authorizedChangeFficw = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficw = true;
                        }
                    }
                }
                $authorizedChangeFfecw = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecw = true;
                        }
                    }
                }
                $authorizedChangeFfecwPc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPc = true;
                        }
                    }
                }
                $authorizedChangeFficwPc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPc = true;
                        }
                    }
                }
                $authorizedChangeFficwEt = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwEt = true;
                        }
                    }
                }
                $authorizedChangeFfecwEt = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwEt = true;
                        }
                    }
                }
                $authorizedChangeFfecwicwPcEt = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwicwPcEt = true;
                        }
                    }
                }
                $authorizedChangeFfeir = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfeir = true;
                        }
                    }
                }
                $authorizedChangeMp = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMp = true;
                        }
                    }
                }
                $authorizedChangeMmhi = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmhi = true;
                        }
                    }
                }
                $authorizedChangeAsmhi = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmhi = true;
                        }
                    }
                }
                $authorizedChangeAsmli = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmli = true;
                        }
                    }
                }
                $authorizedChangeBcmffmr = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBcmffmr = true;
                        }
                    }
                }
                $authorizedChangeFmir = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmir = true;
                        }
                    }
                }
                $authorizedChangeFmslmir = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmslmir = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcEt = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcEt = true;
                        }
                    }
                }
                $authorizedChangeFmPcEt = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcEt = true;
                        }
                    }
                }
                $authorizedChangeFmi = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmi = true;
                        }
                    }
                }
                $authorizedChangeFfecwRefDivFfecw = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwRefDivFfecw = true;
                        }
                    }
                }
                $authorizedChangeFficwRefDivFficw = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwRefDivFficw = true;
                        }
                    }
                }
                $authorizedChangeIcwEt = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwEt = true;
                        }
                    }
                }
                $authorizedChangeBmrEt = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmrEt = true;
                        }
                    }
                }
                $authorizedChangeMmsPcEt = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmsPcEt = true;
                        }
                    }
                }
                $authorizedChangeTbe = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbe = true;
                        }
                    }
                }
                $authorizedChangeCmoRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCmoRef = true;
                        }
                    }
                }
                $authorizedChangeCmoEt = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCmoEt = true;
                        }
                    }
                }
                $authorizedChangeSlmRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeSlmRef = true;
                        }
                    }
                }
                $authorizedChangeAsmtli = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmtli = true;
                        }
                    }
                }
                $authorizedChangeEcsRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcsRef = true;
                        }
                    }
                }
                $authorizedChangeMpMetaRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMpMetaRef = true;
                        }
                    }
                }
                $authorizedChangeBcmRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBcmRef = true;
                        }
                    }
                }
                $authorizedChangeBcmEt = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBcmEt = true;
                        }
                    }
                }
                $authorizedChangeMpRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMpRef = true;
                        }
                    }
                }
                $authorizedChangeMpMetaEtKg = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMpMetaEtKg = true;
                        }
                    }
                }
                $authorizedChangeFmHcPc100 = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPc100 = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcStdA = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcStdB = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcStdC = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcStdD = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcStdE = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcStdE = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcStdF = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcStdF = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcZaMax = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcZbMax = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcZcMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcZcMax = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcZcMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcZcMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcZdMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcZdMax = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcZdMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcZdMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcZeMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcZeMax = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcZeMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcZeMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcZfMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcZfMax = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcZfMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcZfMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcZone = true;
                        }
                    }
                }
                $authorizedChangeFfwPc100 = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPc100 = true;
                        }
                    }
                }
                $authorizedChangeFfwPcStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcStdA = true;
                        }
                    }
                }
                $authorizedChangeFfwPcStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcStdB = true;
                        }
                    }
                }
                $authorizedChangeFfwPcStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcStdC = true;
                        }
                    }
                }
                $authorizedChangeFfwPcStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcStdD = true;
                        }
                    }
                }
                $authorizedChangeFfwPcStdE = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcStdE = true;
                        }
                    }
                }
                $authorizedChangeFfwPcStdF = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcStdF = true;
                        }
                    }
                }
                $authorizedChangeFfwPcStdG = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcStdG = true;
                        }
                    }
                }
                $authorizedChangeFfwPcZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcZaMax = true;
                        }
                    }
                }
                $authorizedChangeFfwPcZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFfwPcZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcZbMax = true;
                        }
                    }
                }
                $authorizedChangeFfwPcZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFfwPcZcMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcZcMax = true;
                        }
                    }
                }
                $authorizedChangeFfwPcZcMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcZcMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFfwPcZdMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcZdMax = true;
                        }
                    }
                }
                $authorizedChangeFfwPcZdMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcZdMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFfwPcZeMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcZeMax = true;
                        }
                    }
                }
                $authorizedChangeFfwPcZeMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcZeMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFfwPcZfMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcZfMax = true;
                        }
                    }
                }
                $authorizedChangeFfwPcZfMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcZfMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFfwPcZgMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcZgMax = true;
                        }
                    }
                }
                $authorizedChangeFfwPcZgMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcZgMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFfwPcZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcZone = true;
                        }
                    }
                }
                $authorizedChangeMmhiStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmhiStdA = true;
                        }
                    }
                }
                $authorizedChangeMmhiStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmhiStdB = true;
                        }
                    }
                }
                $authorizedChangeMmhiStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmhiStdC = true;
                        }
                    }
                }
                $authorizedChangeMmhiStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmhiStdD = true;
                        }
                    }
                }
                $authorizedChangeMmhiZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmhiZaMax = true;
                        }
                    }
                }
                $authorizedChangeMmhiZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmhiZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeMmhiZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmhiZbMax = true;
                        }
                    }
                }
                $authorizedChangeMmhiZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmhiZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeMmhiZcMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmhiZcMax = true;
                        }
                    }
                }
                $authorizedChangeMmhiZcMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmhiZcMaxColor = true;
                        }
                    }
                }
                $authorizedChangeMmhiZdMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmhiZdMax = true;
                        }
                    }
                }
                $authorizedChangeMmhiZdMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmhiZdMaxColor = true;
                        }
                    }
                }
                $authorizedChangeMmhiZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmhiZone = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcInf = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcInf = true;
                        }
                    }
                }
                $authorizedChangeAdcrZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAdcrZaMax = true;
                        }
                    }
                }
                $authorizedChangeAdcrZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAdcrZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeAdcrZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAdcrZbMax = true;
                        }
                    }
                }
                $authorizedChangeAdcrZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAdcrZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeAdcrZcMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAdcrZcMax = true;
                        }
                    }
                }
                $authorizedChangeAdcrZcMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAdcrZcMaxColor = true;
                        }
                    }
                }
                $authorizedChangeAdcrZdMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAdcrZdMax = true;
                        }
                    }
                }
                $authorizedChangeAdcrZdMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAdcrZdMaxColor = true;
                        }
                    }
                }
                $authorizedChangeAdcrZeMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAdcrZeMax = true;
                        }
                    }
                }
                $authorizedChangeAdcrZeMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAdcrZeMaxColor = true;
                        }
                    }
                }
                $authorizedChangeAdcrZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAdcrZone = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcRef100 = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcRef100 = true;
                        }
                    }
                }
                $authorizedChangeAsmmi = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmmi = true;
                        }
                    }
                }
                $authorizedChangeAsmmiStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmmiStdA = true;
                        }
                    }
                }
                $authorizedChangeAsmmiStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmmiStdB = true;
                        }
                    }
                }
                $authorizedChangeAsmmiStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmmiStdC = true;
                        }
                    }
                }
                $authorizedChangeAsmmiStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmmiStdD = true;
                        }
                    }
                }
                $authorizedChangeAsmmiZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmmiZaMax = true;
                        }
                    }
                }
                $authorizedChangeAsmmiZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmmiZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeAsmmiZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmmiZbMax = true;
                        }
                    }
                }
                $authorizedChangeAsmmiZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmmiZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeAsmmiZcMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmmiZcMax = true;
                        }
                    }
                }
                $authorizedChangeAsmmiZcMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmmiZcMaxColor = true;
                        }
                    }
                }
                $authorizedChangeAsmmiZdMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmmiZdMax = true;
                        }
                    }
                }
                $authorizedChangeAsmmiZdMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmmiZdMaxColor = true;
                        }
                    }
                }
                $authorizedChangeAsmmiZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmmiZone = true;
                        }
                    }
                }
                $authorizedChangeEcwPc100 = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPc100 = true;
                        }
                    }
                }
                $authorizedChangeEcwPcRef100 = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcRef100 = true;
                        }
                    }
                }
                $authorizedChangeEcwPcStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcStdA = true;
                        }
                    }
                }
                $authorizedChangeEcwPcStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcStdB = true;
                        }
                    }
                }
                $authorizedChangeEcwPcStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcStdC = true;
                        }
                    }
                }
                $authorizedChangeEcwPcStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcStdD = true;
                        }
                    }
                }
                $authorizedChangeEcwPcStdE = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcStdE = true;
                        }
                    }
                }
                $authorizedChangeEcwPcStdF = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcStdF = true;
                        }
                    }
                }
                $authorizedChangeEcwPcStdG = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcStdG = true;
                        }
                    }
                }
                $authorizedChangeEcwPcZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcZaMax = true;
                        }
                    }
                }
                $authorizedChangeEcwPcZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeEcwPcZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcZbMax = true;
                        }
                    }
                }
                $authorizedChangeEcwPcZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeEcwPcZcMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcZcMax = true;
                        }
                    }
                }
                $authorizedChangeEcwPcZcMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcZcMaxColor = true;
                        }
                    }
                }
                $authorizedChangeEcwPcZdMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcZdMax = true;
                        }
                    }
                }
                $authorizedChangeEcwPcZdMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcZdMaxColor = true;
                        }
                    }
                }
                $authorizedChangeEcwPcZeMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcZeMax = true;
                        }
                    }
                }
                $authorizedChangeEcwPcZeMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcZeMaxColor = true;
                        }
                    }
                }
                $authorizedChangeEcwPcZfMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcZfMax = true;
                        }
                    }
                }
                $authorizedChangeEcwPcZfMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcZfMaxColor = true;
                        }
                    }
                }
                $authorizedChangeEcwPcZgMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcZgMax = true;
                        }
                    }
                }
                $authorizedChangeEcwPcZgMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcZgMaxColor = true;
                        }
                    }
                }
                $authorizedChangeEcwPcZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcZone = true;
                        }
                    }
                }
                $authorizedChangeIcwPc100 = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPc100 = true;
                        }
                    }
                }
                $authorizedChangeIcwPcRef100 = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcRef100 = true;
                        }
                    }
                }
                $authorizedChangeIcwPcStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcStdA = true;
                        }
                    }
                }
                $authorizedChangeIcwPcStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcStdB = true;
                        }
                    }
                }
                $authorizedChangeIcwPcStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcStdC = true;
                        }
                    }
                }
                $authorizedChangeIcwPcStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcStdD = true;
                        }
                    }
                }
                $authorizedChangeIcwPcStdE = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcStdE = true;
                        }
                    }
                }
                $authorizedChangeIcwPcStdF = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcStdF = true;
                        }
                    }
                }
                $authorizedChangeIcwPcStdG = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcStdG = true;
                        }
                    }
                }
                $authorizedChangeIcwPcZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcZaMax = true;
                        }
                    }
                }
                $authorizedChangeIcwPcZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeIcwPcZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcZbMax = true;
                        }
                    }
                }
                $authorizedChangeIcwPcZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeIcwPcZcMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcZcMax = true;
                        }
                    }
                }
                $authorizedChangeIcwPcZcMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcZcMaxColor = true;
                        }
                    }
                }
                $authorizedChangeIcwPcZdMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcZdMax = true;
                        }
                    }
                }
                $authorizedChangeIcwPcZdMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcZdMaxColor = true;
                        }
                    }
                }
                $authorizedChangeIcwPcZeMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcZeMax = true;
                        }
                    }
                }
                $authorizedChangeIcwPcZeMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcZeMaxColor = true;
                        }
                    }
                }
                $authorizedChangeIcwPcZfMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcZfMax = true;
                        }
                    }
                }
                $authorizedChangeIcwPcZfMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcZfMaxColor = true;
                        }
                    }
                }
                $authorizedChangeIcwPcZgMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcZgMax = true;
                        }
                    }
                }
                $authorizedChangeIcwPcZgMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcZgMaxColor = true;
                        }
                    }
                }
                $authorizedChangeIcwPcZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcZone = true;
                        }
                    }
                }
                $authorizedChangeFmPc100 = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPc100 = true;
                        }
                    }
                }
                $authorizedChangeFmPcStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcStdA = true;
                        }
                    }
                }
                $authorizedChangeFmPcStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcStdB = true;
                        }
                    }
                }
                $authorizedChangeFmPcStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcStdC = true;
                        }
                    }
                }
                $authorizedChangeFmPcStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcStdD = true;
                        }
                    }
                }
                $authorizedChangeFmPcStdE = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcStdE = true;
                        }
                    }
                }
                $authorizedChangeFmPcStdF = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcStdF = true;
                        }
                    }
                }
                $authorizedChangeFmPcZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcZaMax = true;
                        }
                    }
                }
                $authorizedChangeFmPcZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFmPcZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcZbMax = true;
                        }
                    }
                }
                $authorizedChangeFmPcZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFmPcZcMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcZcMax = true;
                        }
                    }
                }
                $authorizedChangeFmPcZcMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcZcMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFmPcZdMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcZdMax = true;
                        }
                    }
                }
                $authorizedChangeFmPcZdMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcZdMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFmPcZeMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcZeMax = true;
                        }
                    }
                }
                $authorizedChangeFmPcZeMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcZeMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFmPcZfMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcZfMax = true;
                        }
                    }
                }
                $authorizedChangeFmPcZfMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcZfMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFmPcZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcZone = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPc100 = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPc100 = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcStdA = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcStdB = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcStdC = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcStdD = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcStdE = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcStdE = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcStdF = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcStdF = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcStdG = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcStdG = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcZaMax = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcZbMax = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcZcMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcZcMax = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcZcMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcZcMaxColor = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcZdMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcZdMax = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcZdMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcZdMaxColor = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcZeMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcZeMax = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcZeMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcZeMaxColor = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcZfMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcZfMax = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcZfMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcZfMaxColor = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcZgMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcZgMax = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcZgMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcZgMaxColor = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcZone = true;
                        }
                    }
                }
                $authorizedChangeDffmi = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeDffmi = true;
                        }
                    }
                }
                $authorizedChangeDffmiStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeDffmiStdA = true;
                        }
                    }
                }
                $authorizedChangeDffmiStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeDffmiStdB = true;
                        }
                    }
                }
                $authorizedChangeDffmiStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeDffmiStdC = true;
                        }
                    }
                }
                $authorizedChangeDffmiStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeDffmiStdD = true;
                        }
                    }
                }
                $authorizedChangeDffmiZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeDffmiZaMax = true;
                        }
                    }
                }
                $authorizedChangeDffmiZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeDffmiZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeDffmiZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeDffmiZbMax = true;
                        }
                    }
                }
                $authorizedChangeDffmiZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeDffmiZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeDffmiZcMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeDffmiZcMax = true;
                        }
                    }
                }
                $authorizedChangeDffmiZcMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeDffmiZcMaxColor = true;
                        }
                    }
                }
                $authorizedChangeDffmiZdMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeDffmiZdMax = true;
                        }
                    }
                }
                $authorizedChangeDffmiZdMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeDffmiZdMaxColor = true;
                        }
                    }
                }
                $authorizedChangeDffmiZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeDffmiZone = true;
                        }
                    }
                }
                $authorizedChangeMpMetai = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMpMetai = true;
                        }
                    }
                }
                $authorizedChangeMpMetaiStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMpMetaiStdA = true;
                        }
                    }
                }
                $authorizedChangeMpMetaiStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMpMetaiStdB = true;
                        }
                    }
                }
                $authorizedChangeMpMetaiStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMpMetaiStdC = true;
                        }
                    }
                }
                $authorizedChangeMpMetaiStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMpMetaiStdD = true;
                        }
                    }
                }
                $authorizedChangeMpMetaiZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMpMetaiZaMax = true;
                        }
                    }
                }
                $authorizedChangeMpMetaiZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMpMetaiZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeMpMetaiZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMpMetaiZbMax = true;
                        }
                    }
                }
                $authorizedChangeMpMetaiZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMpMetaiZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeMpMetaiZcMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMpMetaiZcMax = true;
                        }
                    }
                }
                $authorizedChangeMpMetaiZcMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMpMetaiZcMaxColor = true;
                        }
                    }
                }
                $authorizedChangeMpMetaiZdMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMpMetaiZdMax = true;
                        }
                    }
                }
                $authorizedChangeMpMetaiZdMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMpMetaiZdMaxColor = true;
                        }
                    }
                }
                $authorizedChangeMpMetaiZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMpMetaiZone = true;
                        }
                    }
                }
                $authorizedChangeFfmi = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfmi = true;
                        }
                    }
                }
                $authorizedChangeFfmiRef = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfmiRef = true;
                        }
                    }
                }
                $authorizedChangeFfmRefKg = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfmRefKg = true;
                        }
                    }
                }
                $authorizedChangeIffmi = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIffmi = true;
                        }
                    }
                }
                $authorizedChangeIffmiStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIffmiStdA = true;
                        }
                    }
                }
                $authorizedChangeIffmiStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIffmiStdB = true;
                        }
                    }
                }
                $authorizedChangeIffmiStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIffmiStdC = true;
                        }
                    }
                }
                $authorizedChangeIffmiStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIffmiStdD = true;
                        }
                    }
                }
                $authorizedChangeIffmiZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIffmiZaMax = true;
                        }
                    }
                }
                $authorizedChangeIffmiZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIffmiZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeIffmiZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIffmiZbMax = true;
                        }
                    }
                }
                $authorizedChangeIffmiZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIffmiZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeIffmiZcMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIffmiZcMax = true;
                        }
                    }
                }
                $authorizedChangeIffmiZcMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIffmiZcMaxColor = true;
                        }
                    }
                }
                $authorizedChangeIffmiZdMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIffmiZdMax = true;
                        }
                    }
                }
                $authorizedChangeIffmiZdMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIffmiZdMaxColor = true;
                        }
                    }
                }
                $authorizedChangeIffmiZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIffmiZone = true;
                        }
                    }
                }
                $authorizedChangeBmri = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmri = true;
                        }
                    }
                }
                $authorizedChangeBmriStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmriStdA = true;
                        }
                    }
                }
                $authorizedChangeBmriStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmriStdB = true;
                        }
                    }
                }
                $authorizedChangeBmriStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmriStdC = true;
                        }
                    }
                }
                $authorizedChangeBmriStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmriStdD = true;
                        }
                    }
                }
                $authorizedChangeBmriZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmriZaMax = true;
                        }
                    }
                }
                $authorizedChangeBmriZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmriZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeBmriZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmriZbMax = true;
                        }
                    }
                }
                $authorizedChangeBmriZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmriZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeBmriZcMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmriZcMax = true;
                        }
                    }
                }
                $authorizedChangeBmriZcMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmriZcMaxColor = true;
                        }
                    }
                }
                $authorizedChangeBmriZdMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmriZdMax = true;
                        }
                    }
                }
                $authorizedChangeBmriZdMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmriZdMaxColor = true;
                        }
                    }
                }
                $authorizedChangeBmriZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmriZone = true;
                        }
                    }
                }
                $authorizedChangeFfecwPc100 = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPc100 = true;
                        }
                    }
                }
                $authorizedChangeFfecwi = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwi = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcStdA = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcStdB = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcStdC = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcStdD = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcStdE = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcStdE = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcStdF = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcStdF = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcStdG = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcStdG = true;
                        }
                    }
                }
                $authorizedChangeFfecwiStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwiStdA = true;
                        }
                    }
                }
                $authorizedChangeFfecwiStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwiStdB = true;
                        }
                    }
                }
                $authorizedChangeFfecwiStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwiStdC = true;
                        }
                    }
                }
                $authorizedChangeFfecwiStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwiStdD = true;
                        }
                    }
                }
                $authorizedChangeFfecwiStdE = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwiStdE = true;
                        }
                    }
                }
                $authorizedChangeFfecwiStdF = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwiStdF = true;
                        }
                    }
                }
                $authorizedChangeFfecwiStdG = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwiStdG = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcZaMax = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcZbMax = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcZcMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcZcMax = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcZcMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcZcMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcZdMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcZdMax = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcZdMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcZdMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcZeMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcZeMax = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcZeMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcZeMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcZfMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcZfMax = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcZfMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcZfMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcZgMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcZgMax = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcZgMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcZgMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcZone = true;
                        }
                    }
                }
                $authorizedChangeFficwPc100 = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPc100 = true;
                        }
                    }
                }
                $authorizedChangeFficwi = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwi = true;
                        }
                    }
                }
                $authorizedChangeFficwPcStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcStdA = true;
                        }
                    }
                }
                $authorizedChangeFficwPcStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcStdB = true;
                        }
                    }
                }
                $authorizedChangeFficwPcStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcStdC = true;
                        }
                    }
                }
                $authorizedChangeFficwPcStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcStdD = true;
                        }
                    }
                }
                $authorizedChangeFficwPcStdE = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcStdE = true;
                        }
                    }
                }
                $authorizedChangeFficwPcStdF = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcStdF = true;
                        }
                    }
                }
                $authorizedChangeFficwPcStdG = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcStdG = true;
                        }
                    }
                }
                $authorizedChangeFficwiStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwiStdA = true;
                        }
                    }
                }
                $authorizedChangeFficwiStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwiStdB = true;
                        }
                    }
                }
                $authorizedChangeFficwiStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwiStdC = true;
                        }
                    }
                }
                $authorizedChangeFficwiStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwiStdD = true;
                        }
                    }
                }
                $authorizedChangeFficwiStdE = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwiStdE = true;
                        }
                    }
                }
                $authorizedChangeFficwiStdF = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwiStdF = true;
                        }
                    }
                }
                $authorizedChangeFficwiStdG = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwiStdG = true;
                        }
                    }
                }
                $authorizedChangeFficwPcZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcZaMax = true;
                        }
                    }
                }
                $authorizedChangeFficwPcZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFficwPcZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcZbMax = true;
                        }
                    }
                }
                $authorizedChangeFficwPcZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFficwPcZcMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcZcMax = true;
                        }
                    }
                }
                $authorizedChangeFficwPcZcMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcZcMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFficwPcZdMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcZdMax = true;
                        }
                    }
                }
                $authorizedChangeFficwPcZdMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcZdMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFficwPcZeMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcZeMax = true;
                        }
                    }
                }
                $authorizedChangeFficwPcZeMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcZeMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFficwPcZfMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcZfMax = true;
                        }
                    }
                }
                $authorizedChangeFficwPcZfMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcZfMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFficwPcZgMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcZgMax = true;
                        }
                    }
                }
                $authorizedChangeFficwPcZgMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcZgMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFficwPcZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcZone = true;
                        }
                    }
                }
                $authorizedChangeAsmhiStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmhiStdA = true;
                        }
                    }
                }
                $authorizedChangeAsmhiStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmhiStdB = true;
                        }
                    }
                }
                $authorizedChangeAsmhiStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmhiStdC = true;
                        }
                    }
                }
                $authorizedChangeAsmhiStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmhiStdD = true;
                        }
                    }
                }
                $authorizedChangeAsmhiZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmhiZaMax = true;
                        }
                    }
                }
                $authorizedChangeAsmhiZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmhiZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeAsmhiZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmhiZbMax = true;
                        }
                    }
                }
                $authorizedChangeAsmhiZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmhiZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeAsmhiZcMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmhiZcMax = true;
                        }
                    }
                }
                $authorizedChangeAsmhiZcMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmhiZcMaxColor = true;
                        }
                    }
                }
                $authorizedChangeAsmhiZdMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmhiZdMax = true;
                        }
                    }
                }
                $authorizedChangeAsmhiZdMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmhiZdMaxColor = true;
                        }
                    }
                }
                $authorizedChangeAsmhiZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmhiZone = true;
                        }
                    }
                }
                $authorizedChangeBcmi = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBcmi = true;
                        }
                    }
                }
                $authorizedChangeBcmiStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBcmiStdA = true;
                        }
                    }
                }
                $authorizedChangeBcmiStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBcmiStdB = true;
                        }
                    }
                }
                $authorizedChangeBcmiStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBcmiStdC = true;
                        }
                    }
                }
                $authorizedChangeBcmiStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBcmiStdD = true;
                        }
                    }
                }
                $authorizedChangeBcmiZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBcmiZaMax = true;
                        }
                    }
                }
                $authorizedChangeBcmiZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBcmiZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeBcmiZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBcmiZbMax = true;
                        }
                    }
                }
                $authorizedChangeBcmiZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBcmiZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeBcmiZcMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBcmiZcMax = true;
                        }
                    }
                }
                $authorizedChangeBcmiZcMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBcmiZcMaxColor = true;
                        }
                    }
                }
                $authorizedChangeBcmiZdMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBcmiZdMax = true;
                        }
                    }
                }
                $authorizedChangeBcmiZdMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBcmiZdMaxColor = true;
                        }
                    }
                }
                $authorizedChangeBcmiZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBcmiZone = true;
                        }
                    }
                }
                $authorizedChangeImcNorms = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcNorms = true;
                        }
                    }
                }
                $authorizedChangeImcStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcStdA = true;
                        }
                    }
                }
                $authorizedChangeImcStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcStdB = true;
                        }
                    }
                }
                $authorizedChangeImcStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcStdC = true;
                        }
                    }
                }
                $authorizedChangeImcStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcStdD = true;
                        }
                    }
                }
                $authorizedChangeImcStdE = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcStdE = true;
                        }
                    }
                }
                $authorizedChangeImcStdF = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcStdF = true;
                        }
                    }
                }
                $authorizedChangeImcStdG = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcStdG = true;
                        }
                    }
                }
                $authorizedChangeImcZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcZaMax = true;
                        }
                    }
                }
                $authorizedChangeImcZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeImcZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcZbMax = true;
                        }
                    }
                }
                $authorizedChangeImcZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeImcZcMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcZcMax = true;
                        }
                    }
                }
                $authorizedChangeImcZcMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcZcMaxColor = true;
                        }
                    }
                }
                $authorizedChangeImcZdMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcZdMax = true;
                        }
                    }
                }
                $authorizedChangeImcZdMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcZdMaxColor = true;
                        }
                    }
                }
                $authorizedChangeImcZeMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcZeMax = true;
                        }
                    }
                }
                $authorizedChangeImcZeMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcZeMaxColor = true;
                        }
                    }
                }
                $authorizedChangeImcZfMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcZfMax = true;
                        }
                    }
                }
                $authorizedChangeImcZfMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcZfMaxColor = true;
                        }
                    }
                }
                $authorizedChangeImcZgMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcZgMax = true;
                        }
                    }
                }
                $authorizedChangeImcZgMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcZgMaxColor = true;
                        }
                    }
                }
                $authorizedChangeImcZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcZone = true;
                        }
                    }
                }
                $authorizedChangeFmslmirZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmslmirZaMax = true;
                        }
                    }
                }
                $authorizedChangeFmslmirZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmslmirZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFmslmirZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmslmirZbMax = true;
                        }
                    }
                }
                $authorizedChangeFmslmirZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmslmirZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFmslmirZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmslmirZone = true;
                        }
                    }
                }
                $authorizedChangeFmirZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmirZaMax = true;
                        }
                    }
                }
                $authorizedChangeFmirZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmirZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFmirZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmirZbMax = true;
                        }
                    }
                }
                $authorizedChangeFmirZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmirZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeFmirZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmirZone = true;
                        }
                    }
                }
                $authorizedChangeSlmirZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeSlmirZaMax = true;
                        }
                    }
                }
                $authorizedChangeSlmirZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeSlmirZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeSlmirZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeSlmirZbMax = true;
                        }
                    }
                }
                $authorizedChangeSlmirZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeSlmirZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeSlmirZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeSlmirZone = true;
                        }
                    }
                }
                $authorizedChangeWhrZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeWhrZaMax = true;
                        }
                    }
                }
                $authorizedChangeWhrZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeWhrZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeWhrZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeWhrZbMax = true;
                        }
                    }
                }
                $authorizedChangeWhrZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeWhrZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeWhrZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeWhrZone = true;
                        }
                    }
                }
                $authorizedChangeWhtrZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeWhtrZaMax = true;
                        }
                    }
                }
                $authorizedChangeWhtrZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeWhtrZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeWhtrZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeWhtrZbMax = true;
                        }
                    }
                }
                $authorizedChangeWhtrZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeWhtrZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeWhtrZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeWhtrZone = true;
                        }
                    }
                }
                $authorizedChangeTotalCcScZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalCcScZaMax = true;
                        }
                    }
                }
                $authorizedChangeTotalCcScZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalCcScZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeTotalCcScZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalCcScZbMax = true;
                        }
                    }
                }
                $authorizedChangeTotalCcScZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalCcScZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeTotalCcScZcMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalCcScZcMax = true;
                        }
                    }
                }
                $authorizedChangeTotalCcScZcMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalCcScZcMaxColor = true;
                        }
                    }
                }
                $authorizedChangeTotalCcScZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalCcScZone = true;
                        }
                    }
                }
                $authorizedChangeTotalMuhScZaMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalMuhScZaMax = true;
                        }
                    }
                }
                $authorizedChangeTotalMuhScZaMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalMuhScZaMaxColor = true;
                        }
                    }
                }
                $authorizedChangeTotalMuhScZbMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalMuhScZbMax = true;
                        }
                    }
                }
                $authorizedChangeTotalMuhScZbMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalMuhScZbMaxColor = true;
                        }
                    }
                }
                $authorizedChangeTotalMuhScZcMax = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalMuhScZcMax = true;
                        }
                    }
                }
                $authorizedChangeTotalMuhScZcMaxColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalMuhScZcMaxColor = true;
                        }
                    }
                }
                $authorizedChangeTotalMuhScZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalMuhScZone = true;
                        }
                    }
                }
                $authorizedChangeCibleZaColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleZaColor = true;
                        }
                    }
                }
                $authorizedChangeCibleZbColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleZbColor = true;
                        }
                    }
                }
                $authorizedChangeCibleZcColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleZcColor = true;
                        }
                    }
                }
                $authorizedChangeCibleZdColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleZdColor = true;
                        }
                    }
                }
                $authorizedChangeCibleZeColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleZeColor = true;
                        }
                    }
                }
                $authorizedChangeCibleZfColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleZfColor = true;
                        }
                    }
                }
                $authorizedChangeCibleZone = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleZone = true;
                        }
                    }
                }
                $authorizedChangeCiblePoint = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCiblePoint = true;
                        }
                    }
                }
                $authorizedChangeCibleIcwPcStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleIcwPcStdB = true;
                        }
                    }
                }
                $authorizedChangeCibleIcwPcStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleIcwPcStdC = true;
                        }
                    }
                }
                $authorizedChangeCibleIcwPcStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleIcwPcStdD = true;
                        }
                    }
                }
                $authorizedChangeCibleIcwPcStdE = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleIcwPcStdE = true;
                        }
                    }
                }
                $authorizedChangeCibleFmHcPcStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleFmHcPcStdA = true;
                        }
                    }
                }
                $authorizedChangeCibleFmHcPcStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleFmHcPcStdB = true;
                        }
                    }
                }
                $authorizedChangeCibleFmHcPcStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleFmHcPcStdC = true;
                        }
                    }
                }
                $authorizedChangeCibleFmHcPcStdE = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleFmHcPcStdE = true;
                        }
                    }
                }
                $authorizedChangeCibleFfwStdA = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleFfwStdA = true;
                        }
                    }
                }
                $authorizedChangeCibleFfwStdB = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleFfwStdB = true;
                        }
                    }
                }
                $authorizedChangeCibleFfwStdC = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleFfwStdC = true;
                        }
                    }
                }
                $authorizedChangeCibleFfwStdD = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleFfwStdD = true;
                        }
                    }
                }
                $authorizedChangeFmHcPcPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmHcPcPos = true;
                        }
                    }
                }
                $authorizedChangeFfwPcPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfwPcPos = true;
                        }
                    }
                }
                $authorizedChangeMmhiPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMmhiPos = true;
                        }
                    }
                }
                $authorizedChangeAdcrPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAdcrPos = true;
                        }
                    }
                }
                $authorizedChangeAdcrConsInf = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAdcrConsInf = true;
                        }
                    }
                }
                $authorizedChangeAdcrConsSup = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAdcrConsSup = true;
                        }
                    }
                }
                $authorizedChangeAsmmiPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmmiPos = true;
                        }
                    }
                }
                $authorizedChangeEcwPcPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeEcwPcPos = true;
                        }
                    }
                }
                $authorizedChangeIcwPcPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIcwPcPos = true;
                        }
                    }
                }
                $authorizedChangeFmPcPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmPcPos = true;
                        }
                    }
                }
                $authorizedChangeTbwffmPcPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTbwffmPcPos = true;
                        }
                    }
                }
                $authorizedChangeDffmiPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeDffmiPos = true;
                        }
                    }
                }
                $authorizedChangeMpMetaiPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeMpMetaiPos = true;
                        }
                    }
                }
                $authorizedChangeIffmiPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeIffmiPos = true;
                        }
                    }
                }
                $authorizedChangeBmriPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBmriPos = true;
                        }
                    }
                }
                $authorizedChangeFfecwPcPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwPcPos = true;
                        }
                    }
                }
                $authorizedChangeFfecwiPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFfecwiPos = true;
                        }
                    }
                }
                $authorizedChangeFficwPcPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwPcPos = true;
                        }
                    }
                }
                $authorizedChangeFficwiPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFficwiPos = true;
                        }
                    }
                }
                $authorizedChangeAsmhiPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmhiPos = true;
                        }
                    }
                }
                $authorizedChangeBcmiPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeBcmiPos = true;
                        }
                    }
                }
                $authorizedChangeImcPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeImcPos = true;
                        }
                    }
                }
                $authorizedChangeFmslmirCcSc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmslmirCcSc = true;
                        }
                    }
                }
                $authorizedChangeFmirCcSc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmirCcSc = true;
                        }
                    }
                }
                $authorizedChangeSlmirCcSc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeSlmirCcSc = true;
                        }
                    }
                }
                $authorizedChangeWhrCcSc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeWhrCcSc = true;
                        }
                    }
                }
                $authorizedChangeWhtrCcSc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeWhtrCcSc = true;
                        }
                    }
                }
                $authorizedChangeTotalCcSc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalCcSc = true;
                        }
                    }
                }
                $authorizedChangeTotalCcScPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalCcScPos = true;
                        }
                    }
                }
                $authorizedChangeFmslmirMuhSc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmslmirMuhSc = true;
                        }
                    }
                }
                $authorizedChangeFmirMuhSc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeFmirMuhSc = true;
                        }
                    }
                }
                $authorizedChangeSlmirMuhSc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeSlmirMuhSc = true;
                        }
                    }
                }
                $authorizedChangeTotalMuhSc = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalMuhSc = true;
                        }
                    }
                }
                $authorizedChangeTotalMuhScPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalMuhScPos = true;
                        }
                    }
                }
                $authorizedChangeCibleIcwPcPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleIcwPcPos = true;
                        }
                    }
                }
                $authorizedChangeCibleImcPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleImcPos = true;
                        }
                    }
                }
                $authorizedChangeCibleFmHcPcPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleFmHcPcPos = true;
                        }
                    }
                }
                $authorizedChangeCibleMmhiPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleMmhiPos = true;
                        }
                    }
                }
                $authorizedChangeCibleAsmhiPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleAsmhiPos = true;
                        }
                    }
                }
                $authorizedChangeCibleFfwPos = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeCibleFfwPos = true;
                        }
                    }
                }
                $authorizedChangeAsmliColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmliColor = true;
                        }
                    }
                }
                $authorizedChangeAsmtliColor = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAsmtliColor = true;
                        }
                    }
                }
                $authorizedChangeRequest = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeRequest = true;
                        }
                    }
                }
                $authorizedChangeResponse = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeResponse = true;
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
     * Partial Update to a Measurement entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function patchAction(Request $request, Measurement $entity)
    {
        return $this->putAction($request, $entity);
    }

    /**
     * Delete a Measurement entity.
     *
     * @View(statusCode=204)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function deleteAction(Request $request, Measurement $entity)
    {
        try {
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                   if (substr_count($role, 'ACC') > 0) {
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
