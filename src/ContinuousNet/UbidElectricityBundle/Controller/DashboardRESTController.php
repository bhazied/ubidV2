<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\Util\Codes;
use FOS\RestBundle\View\View as FOSView;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Translation\Translator;
use Symfony\Component\Translation\MessageSelector;
use Symfony\Component\Translation\Loader\YamlFileLoader;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use ContinuousNet\BiodyXpertBundle\Entity\User;
use ContinuousNet\BiodyXpertBundle\Form\UserType;
//use FOS\UserBundle\Event\GetResponseUserEvent;
//use FOS\UserBundle\Event\FormEvent;
//use FOS\UserBundle\FOSUserEvents;
//use FOS\UserBundle\Event\FilterUserResponseEvent;
use FOS\RestBundle\Controller\FOSRestController;
use ContinuousNet\BiodyXpertBundle\Entity\Measurement;
use ContinuousNet\BiodyXpertBundle\Entity\Patient;
use ContinuousNet\BiodyXpertBundle\Entity\BodyMeasurement;

/**
 * Public Dashboard REST Controller
 *
 * Manage Api V1
 *
 * PHP version 5.4.4
 *
 * @category   Symfony 2 REST Controller
 * @package  ContinuousNet\UbidElectricityBundle\Controller
 * @author    Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license  CONTINUOUS NET REGULAR LICENSE
 * @version  Release: 1.0
 * @link    http://ubidelectricity.continuousnet.com/ContinuousNet/BiodyXpertBundle/Controller
 * @see      DashboardRESTController
 * @since      Class available since Release 1.0
 * @deprecated Nothing
 * @access    public
 */
class DashboardRESTController extends BaseRESTController {


    /**
     * @Get("/data")
     * @View(serializerEnableMaxDepthChecks=true)
     */
    public function dataAction() {
        try {

            $em = $this->getDoctrine()->getManager();

            $data = array(
            );

            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:Tender', 't_');
            $qb->select('count(t_.id)');
            $qb->andWhere('t_.creatorUser = :creatorUser')->setParameter('creatorUser', $this->getUser()->getId());
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ACC') > 0) {
                        $qb->andWhere('t_.creatorUser = :creatorUser')->setParameter('creatorUser', $this->getUser()->getId());
                    }
                }
            }
            $data['countTenders'] = $qb->getQuery()->getSingleScalarResult();

            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:Bid', 'b_');
            $qb->select('count(b_.id)');
            $qb->andWhere('b_.creatorUser = :creatorUser')->setParameter('creatorUser', $this->getUser()->getId());
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ACC') > 0) {
                        $qb->andWhere('b_.creatorUser = :creatorUser')->setParameter('creatorUser', $this->getUser()->getId());
                    }
                }
            }
            $data['countBids'] = $qb->getQuery()->getSingleScalarResult();

            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:SupplierProduct', 'sp_');
            $qb->select('count(sp_.id)');
            $qb->andWhere('sp_.creatorUser = :creatorUser')->setParameter('creatorUser', $this->getUser()->getId());
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ACC') > 0) {
                        $qb->andWhere('sp_.creatorUser = :creatorUser')->setParameter('creatorUser', $this->getUser()->getId());
                    }
                }
            }
            $data['countSupplierProducts'] = $qb->getQuery()->getSingleScalarResult();

            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:Buyer', 'b_');
            $qb->select('count(b_.id)');
            $qb->andWhere('b_.creatorUser = :creatorUser')->setParameter('creatorUser', $this->getUser()->getId());
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ACC') > 0) {
                        $qb->andWhere('b_.creatorUser = :creatorUser')->setParameter('creatorUser', $this->getUser()->getId());
                    }
                }
            }
            $data['countBuyers'] = $qb->getQuery()->getSingleScalarResult();

            $qb = $em->createQueryBuilder();
            $qb->from('UbidElectricityBundle:Supplier', 's_');
            $qb->select('count(s_.id)');
            $qb->andWhere('s_.creatorUser = :creatorUser')->setParameter('creatorUser', $this->getUser()->getId());
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ACC') > 0) {
                        $qb->andWhere('s_.creatorUser = :creatorUser')->setParameter('creatorUser', $this->getUser()->getId());
                    }
                }
            }
            $data['countSuppliers'] = $qb->getQuery()->getSingleScalarResult();

            return $data;

        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}