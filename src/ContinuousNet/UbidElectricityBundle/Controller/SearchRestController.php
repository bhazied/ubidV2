<?php
/**
 * Created by PhpStorm.
 * User: Ben Hadj Amor Zied
 * Date: 24/10/16
 * Time: 10:01
 */

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\Tender;
use Doctrine\ORM\QueryBuilder;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\Util\Codes;
use FOS\RestBundle\View\View AS FOSView;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use ContinuousNet\UbidElectricityBundle\EventListener\UserSessionData;
use Symfony\Component\Validator\Constraints\DateTime;

class SearchRestController extends FOSRestController {

    /**
     * @POST("/search")
     * @View(serializerEnableMaxDepthChecks=true)
     * @param Request $request
     */
    public function searchAction(Request $request) {
        try {
            $categories = $request->request->get('categories') ? $request->request->get('categories') : array();
            $countries = $request->request->get('countries') ? $request->request->get('countries') : array();
            $totalCostValue =  !is_null($request->request->get('totalCostValue'))? $request->request->get('totalCostValue') : 0;
            $totalCostOperator = ! !is_null($request->request->get('totalCostOperator'))? $request->request->get('totalCostOperator') : null;
            $publishDate = !is_null($request->request->get('publishDate')) ? $request->request->get('publishDate') : null;
            $publishDateFrom = !is_null($request->request->get('publishDateFrom')) ? $request->request->get('publishDateFrom') : null;
            $publishDateTo = !is_null($request->request->get('publishDateTo')) ? $request->request->get('publishDateTo') : null;
            $deadline = !is_null($request->request->get('deadline')) ? $request->request->get('deadline') : null;
            $deadlineFrom = !is_null($request->request->get('deadlineFrom')) ? $request->request->get('deadlineFrom') : null;
            $deadlineTo = !is_null($request->request->get('deadlineTo')) ? $request->request->get('deadlineTo') : null;
            $searchText = !is_null($request->request->get('searchText')) ? $request->request->get('searchText') : null;
            $data = [
                'inlineCount' => 0,
                'queries' => [
                    'categories' => $categories,
                    'countries' => $countries,
                    'total_cost_value' => $totalCostValue,
                    'total_cost_operator' => $totalCostOperator,
                    'publish_date' => $publishDate,
                    'publish_date_from' => $publishDateFrom,
                    'publish_date_to' => $publishDateTo,
                    'deadline' => $deadline,
                    'deadlineFrom' => $deadlineFrom,
                    'deadlineTo' => $deadlineTo,
                    'searchText' => $searchText
                ],
                'results' => []
            ];

            $qb = $this->getDoctrine()->getManager()->createQueryBuilder();

            $qb_language = clone $qb;
            $qb_language->from('UbidElectricityBundle:Language', 'l_');
            $qb_language->select('l_');
            $qb_language->andWhere('l_.code = :code')->setParameter('code', $request->getLocale());
            $language = $qb_language->getQuery()->getOneOrNullResult();

            $qb_tender = clone $qb;
            $qb_consultation = clone $qb;
            $qb_buyer = clone $qb;
            $qb_supplier = clone $qb;

            $today = new \DateTime();

            //get Tenders
            $qb_tender->from('UbidElectricityBundle:Tender', 't_');
            $qb_tender->andWhere('t_.validated = 1');
            $qb_tender->andwhere('t_.status = :status')->setParameters(array('status' => 'Online'));
            if (!is_null($searchText)) {
                $qb_tender->andWhere($qb_tender->expr()->like(
                    $qb_tender->expr()->upper($qb_tender->expr()->concat('COALESCE(t_.title, \'\')', $qb_tender->expr()->concat('COALESCE(t_.slug, \'\')', $qb_tender->expr()->concat('COALESCE(t_.reference, \'\')', 'COALESCE(t_.description, \'\')')))),
                    $qb_tender->expr()->upper($qb_tender->expr()->literal('%' . $searchText . '%'))
                ));
            }
            $qb_tender->andWhere('t_.section = :section')->setParameter('section', 'Tender');
            if (count($categories) > 0) {
                $qb_tender->andWhere(':categories MEMBER OF t_.categories')
                    ->setParameter('categories', $categories);
            }
            if (count($countries) > 0) {
                $qb_tender->andWhere($qb_tender->expr()->in('t_.country', ':countries'))
                    ->setParameter('countries', $countries);
            }
            if (!is_null($totalCostOperator) && $totalCostValue > 0) {
                $qb_tender->andWhere('t_.estimatedCost '.$totalCostOperator.' :totalCostValue')
                    ->setParameter('totalCostValue', $totalCostValue);
            }
            if (!is_null($publishDate)) {
                $this->getWhereDateClause($publishDate, $publishDateFrom, $publishDateTo, 't_.publishDate', $qb_tender);
            } else {
                $qb_tender->andWhere('t_.publishDate is NULL OR t_.publishDate <= :today')->setParameter('today', $today);
            }
            if (!is_null($deadline)) {
                $this->getWhereDateClause($deadline, $deadlineFrom, $deadlineTo, 't_.deadline', $qb_tender);
            } else {
                $qb_tender->andWhere('t_.deadline is NULL OR t_.deadline > :today')->setParameter('today', $today);
            }
            $qb_tender_count = clone $qb_tender;
            $tenders = $qb_tender->select('t_')->getQuery()->getResult();
            $tendersCount = $qb_tender_count->select('count(t_.id)')->getQuery()->getSingleScalarResult();
            $data['tenders'] = [
                'inlineCount' => $tendersCount,
                'data' => $tenders
            ];

            //get Consultations
            $qb_consultation->from('UbidElectricityBundle:Tender', 'c_');
            $qb_tender->andWhere('c_.validated = 1');
            $qb_consultation->andwhere('c_.status = :status')->setParameters(array('status' => 'Online'));
            if (!is_null($searchText)) {
                $qb_consultation->andWhere($qb_consultation->expr()->like(
                    $qb_consultation->expr()->upper($qb_consultation->expr()->concat('COALESCE(c_.title, \'\')', $qb_consultation->expr()->concat('COALESCE(c_.slug, \'\')', $qb_consultation->expr()->concat('COALESCE(c_.reference, \'\')', 'COALESCE(c_.description, \'\')')))),
                    $qb_consultation->expr()->upper($qb_consultation->expr()->literal('%' . $searchText . '%'))
                ));
            }
            $qb_consultation->andWhere('c_.section = :section')->setParameter('section', 'Consultation');
            if (count($categories) > 0) {
                $qb_consultation->andWhere(':categories MEMBER OF c_.categories')
                    ->setParameter('categories', $categories);
            }
            if (count($countries) > 0) {
                $qb_consultation->andWhere($qb_consultation->expr()->in('c_.country', ':countries'))
                    ->setParameter('countries', $countries);
            }
            if (!is_null($totalCostOperator) && $totalCostValue > 0) {
                $qb_consultation->andWhere('c_.estimatedCost '.$totalCostOperator.' :totalCostValue')
                    ->setParameter('totalCostValue', $totalCostValue);
            }
            if (!is_null($publishDate)) {
                $this->getWhereDateClause($publishDate, $publishDateFrom, $publishDateTo, 'c_.publishDate', $qb_consultation);
            } else {
                $qb_consultation->andWhere('c_.publishDate is NULL OR c_.publishDate <= :today')->setParameter('today', $today);
            }
            if (!is_null($deadline)) {
                $this->getWhereDateClause($deadline, $deadlineFrom, $deadlineTo, 'c_.deadline', $qb_consultation);
            } else {
                $qb_consultation->andWhere('c_.deadline is NULL OR c_.deadline > :today')->setParameter('today', $today);
            }
            $qb_consultation_count = clone $qb_consultation;
            $consultations = $qb_consultation->select('c_')->getQuery()->getResult();
            $consultationsCount = $qb_consultation_count->select('count(c_.id)')->getQuery()->getSingleScalarResult();
            $data['consultations'] = [
                'inlineCount' => $consultationsCount,
                'data' => $consultations
            ];

            //get Buyers
            $qb_buyer->from('UbidElectricityBundle:Buyer', 'b_');
            $qb_buyer->andWhere('b_.isPublic = 1');
            if (!is_null($searchText)) {
                $qb_buyer->where($qb_buyer->expr()->like(
                    $qb_buyer->expr()->upper($qb_buyer->expr()->concat('COALESCE(b_.name, \'\')', $qb_buyer->expr()->concat('COALESCE(b_.firstName, \'\')', $qb_buyer->expr()->concat('COALESCE(b_.lastName, \'\')', $qb_buyer->expr()->concat('COALESCE(b_.job, \'\')', 'COALESCE(b_.companyName, \'\')'))))),
                    $qb_buyer->expr()->upper('b_.name'),
                    $qb_buyer->expr()->upper($qb_buyer->expr()->literal('%' . $searchText . '%'))
                ));
            }
            if (count($categories) > 0) {
                $qb_buyer->andWhere(':categories MEMBER OF b_.categories')
                    ->setParameter('categories', $categories);
            }
            if (count($countries) > 0) {
                $qb_buyer->andWhere($qb_buyer->expr()->in('b_.country', ':countries'))
                    ->setParameter('countries', $countries);
            }
            $qb_buyer_count = clone $qb_buyer;
            $buyers = $qb_buyer->select('b_')->getQuery()->getResult();
            $buyersCount = $qb_buyer_count->select('count(b_.id)')->getQuery()->getSingleScalarResult();
            $data['buyers'] = [
                'inlineCount' => $buyersCount,
                'data' => $buyers
            ];

            //get Suppliers
            $qb_supplier->from('UbidElectricityBundle:Supplier', 's_');
            $qb_supplier->andWhere('s_.isPublic = 1');
            if (!is_null($searchText)) {
                $qb_supplier->where($qb_supplier->expr()->like(
                    $qb_supplier->expr()->upper($qb_supplier->expr()->concat('COALESCE(s_.name, \'\')', $qb_supplier->expr()->concat('COALESCE(s_.firstName, \'\')', $qb_supplier->expr()->concat('COALESCE(s_.lastName, \'\')', $qb_supplier->expr()->concat('COALESCE(s_.job, \'\')', 'COALESCE(s_.companyName, \'\')'))))),
                    $qb_supplier->expr()->upper($qb_supplier->expr()->literal('%' . $searchText . '%'))
                ));
            }
            if (count($categories) > 0) {
                $qb_supplier->andWhere(':categories MEMBER OF s_.categories')
                    ->setParameter('categories', $categories);
            }
            if (count($countries) > 0) {
                $qb_supplier->andWhere($qb_supplier->expr()->in('s_.country', ':countries'))
                    ->setParameter('countries', $countries);
            }
            $qb_supplier_count = clone $qb_supplier;
            $suppliers = $qb_supplier->select('s_')->getQuery()->getResult();
            $suppliersCount = $qb_supplier_count->select('count(s_.id)')->getQuery()->getSingleScalarResult();
            $data['suppliers'] = [
                'inlineCount' => $suppliersCount,
                'data' => $suppliers
            ];

            $data['inlineCount'] = $tendersCount + $consultationsCount + $buyersCount + $suppliersCount;

            return $data;

        } catch(\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * @GET("/maxCost")
     * @View(serializerEnableMaxDepthChecks=true)
     */
    public function maxCostAction() {
        try {
            $qb = $this->getDoctrine()->getManager()->createQueryBuilder()
                ->from('UbidElectricityBundle:Tender', 't_');
            $qb->select('Max(t_.estimatedCost) AS maxEstimatedCost');
            $maxEstimatedCost = $qb->getQuery()->getSingleScalarResult();
            return array('value' =>  $maxEstimatedCost);
        } catch(\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    private function getWhereDateClause($interval, $date1, $date2, $field, QueryBuilder $qb) {
        if (!is_null($interval)) {
            if ($interval == 'today') {
                $date = new \DateTime();
                $start = $date->setTime(0,0,0);
                $end = $date->setTime(23, 59, 59);
                $qb->andWhere($field .' BETWEEN :start AND :end')->setParameter('start', $start)->setParameter('end', $end);
            } else if ($interval == 'yesterday') {
                $start = new \DateTime();
                $end = clone  $start;
                $end->modify('-1 days');
                $qb->andWhere($field .' BETWEEN :start AND :end')->setParameter('start', $start)->setParameter('end', $end);
            } else if ($interval == 'last7days') {
                $start = new \DateTime();
                $end = clone  $start;
                $end->modify('-7 days');
                $qb->andWhere($field .' BETWEEN :start AND :end')->setParameter('start', $start)->setParameter('end', $end);
            } else if ($interval == 'last30days') {
                $start = new \DateTime();
                $end = clone  $start;
                $end->modify('-30 days');
                $qb->andWhere($field .' BETWEEN :start AND :end')->setParameter('start', $start)->setParameter('end', $end);
            } else if ($interval == 'thismonth') {
                $start = new \DateTime();
                $end = clone  $start;
                $end->modify('first day of');
                $qb->andWhere($field .' BETWEEN :start AND :end')->setParameter('start', $start)->setParameter('end', $end);
            } else if ($interval == 'lastmonth') {
                $start = new \DateTime();
                $end = clone  $start;
                $end->modify('-1 months');
                $qb->andWhere($field .' BETWEEN :start AND :end')->setParameter('start', $start)->setParameter('end', $end);
            } else if ($interval == 'customdate') {
                if (!is_null($date1)) {
                    $qb->andWhere($field.' >= :'.$field)->setParameter($field, $date1);
                } else if (!is_null($date2)) {
                    $qb->andWhere($field.' <= :'.$field)->setParameter($field, $date2);
                }
            }
        }
    }

}