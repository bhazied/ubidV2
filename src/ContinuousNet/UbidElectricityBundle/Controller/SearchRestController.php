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
     * @POST("/sr")
     * @View(serializerEnableMaxDepthChecks=true)
     * @param Request $request
     */
    public function srAction(Request $request){

        try{
            $countries = $request->request->get('countries') ? $request->request->get('countries') : array();
            $totalCosvalue =  !is_null($request->request->get('totalCosValue'))? $request->request->get('totalCosValue') : 0;
            $totalCostOperator = ! !is_null($request->request->get('totalCostOperator'))? $request->request->get('totalCostOperator') : null;
            $publishDate = !is_null($request->request->get('publishDate')) ? $request->request->get('publishDate') : null;
            $publishDateFrom = !is_null($request->request->get('publishDateFrom')) ? $request->request->get('publishDateFrom') : null;
            $publishDateTo = !is_null($request->request->get('publishDateTo')) ? $request->request->get('publishDateTo') : null;
            $deadline = !is_null($request->request->get('deadline')) ? $request->request->get('deadline') : null;
            $deadline1 = !is_null($request->request->get('deadline1')) ? $request->request->get('deadline1') : null;
            $deadline2 = !is_null($request->request->get('deadline2')) ? $request->request->get('deadline2') : null;
            $tender_categories = $request->request->get('tenderCategories') ? $request->request->get('tenderCategories') : array();
            $data = [
                'inlineCount' => 0,
                'queries' => [
                    'countries' => $countries,
                    'total_cos_value' => $totalCosvalue,
                    'total_cost_operator' => $totalCostOperator,
                    'publish_date' => $publishDate,
                    'publish_date_from' => $publishDateFrom,
                    'publish_date_to' => $publishDateTo,
                    'deadline' => $deadline,
                    'deadline1' => $deadline1,
                    'deadline2' => $deadline2,
                    'tender_categories' => $tender_categories
                ],
                'results' => []
            ];
            $qb = $this->getDoctrine()->getManager()->createQueryBuilder();
            $qb->from("UbidElectricityBundle:Tender", "t_");

            if(count($countries) > 0){
                $qb->andWhere($qb->expr()->in("t_.country", ":countries"))->setParameter("countries", $countries);
            }
            if(!is_null($totalCostOperator) && $totalCosvalue > 0){
                $qb->andWhere("t_.estimatedCost ".$totalCostOperator." :totalCosvalue")
                    ->setParameter("totalCosvalue", $totalCosvalue);
            }
            $this->getWhereDateClause($publishDate, $publishDateFrom, $publishDateTo, 'publishDate', $qb, 't_.');
            $this->getWhereDateClause($deadline, $deadline1, $deadline2, 'deadline', $qb, 't_.');

            if(count($tender_categories) > 0){
                $qb->andWhere(":tender_categories MEMBER OF t_.categories")
                    ->setParameter("tender_categories", $tender_categories);
            }

            $qbList = clone $qb;
            $qb->select("COUNT(t_.id)");
            $data['inlineCount'] = $qb->getQuery()->getSingleScalarResult();

            $limit = 10;
            $offset = 0;
            if(!is_null($request->request->get('page'))){
                $offset = $limit * $request->request->get('page');
            }
            $qbList->select("t_");
            $qbList->setMaxResults($limit);
            $qbList->setFirstResult($offset);
            $results = $qbList->getQuery()->getResult();
            if($results){
                $data['results'] = $results;
            }
            return $data;
        }
        catch(\Exception $e){
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }

    }


    /**
     * @POST("/genericSearch")
     * @View(serializerEnableMaxDepthChecks=true)
     * @param Request $request
     */
    public function genericSearchAction(Request $request){
        try{
            $searchText = $request->request->get('searchText');
            $data = [];
            $qb = $this->getDoctrine()->getManager()->createQueryBuilder();
            $qb_buyer = clone $qb;
            $qb_supplier = clone $qb;
            $qb_tender = clone $qb;
            //get Tenders
            $qb_tender->from("UbidElectricityBundle:Tender", 't_')
                ->where($qb_tender->expr()->like(
                    $qb_tender->expr()->upper( $qb_tender->expr()->concat('t_.title', 't_.slug', 't_.reference', 't_.description') ),
                    $qb_tender->expr()->upper( $qb_tender->expr()->literal('%'. $searchText .'%') )
                ));
            $qb_tender_count = clone $qb_tender;
            $tenders = $qb_tender->select('t_')->getQuery()->getResult();

            $tenderCount = $qb_tender_count->select('count(t_.id)')->getQuery()->getSingleScalarResult();

            //get Suppliers
            $qb_supplier->from("UbidElectricityBundle:Supplier", 's_')
                ->where($qb_supplier->expr()->like(
                    $qb_supplier->expr()->upper( $qb_supplier->expr()->concat('s_.name', 's_.firstName', 's_.lastName', 's_.job', 's_.companyName') ),
                    $qb_supplier->expr()->upper( $qb_supplier->expr()->literal('%'. $searchText .'%'))
                ));
            $qb_supplier_count = clone $qb_supplier;
            $suppliers = $qb_supplier->select('s_')->getQuery()->getResult();

            $supplierCount = $qb_supplier_count->select('count(s_.id)')->getQuery()->getSingleScalarResult();

            //get Buyers
            $qb_buyer->from("UbidElectricityBundle:Buyer", 'b_')
                ->where($qb_buyer->expr()->like(
                    $qb_buyer->expr()->upper( $qb_buyer->expr()->concat('b_.name', 'b_.firstName', 'b_.lastName', 'b_.job','b_.companyNames') ),
                    $qb_buyer->expr()->upper( $qb_buyer->expr()->literal('%'. $searchText .'%') )
                ));
            $qb_buyer_count = clone $qb_buyer;
            $buyers = $qb_buyer->select('b_')->getQuery()->getResult();

            $buyerCount = $qb_buyer_count->select('count(b_.id)')->getQuery()->getSingleScalarResult();

            $data = [
                'inlineCount' => ($buyerCount + $supplierCount + $tenderCount),
                "tenders" => [
                    'inlineCount' => $tenderCount,
                    'data' => $tenders
                ],
                "suppliers" => [
                    'inlineCount' => $supplierCount,
                    'data' => $suppliers
                ],
                "buyers" => [
                    'inlineCount' => $buyerCount,
                    'data' => $buyers
                ]
            ];

            /*$data = [
                "tenders" => $qb_tender->getQuery()->getSql(),
                "supplier" => $qb_supplier->getQuery()->getSql(),
                "buyers" => $qb_buyer->getQuery()->getSql()
            ];*/
            return $data;
        }
        catch(\Exception $e){
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * @GET("/maxCost")
     * @View(serializerEnableMaxDepthChecks=true)
     */
    public function maxCostAction(){
        try{
            $qb = $this->getDoctrine()->getManager()->createQueryBuilder()
                ->from("UbidElectricityBundle:Tender", "t_");
            $qb->select("Max(t_.estimatedCost) AS maxEstimatedCost");
            $maxEstimatedCost = $qb->getQuery()->getSingleScalarResult();
            return array('value' =>  $maxEstimatedCost);
        }
        catch(\Exception $e){
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    // $this->getWhereDateClause($publishDate, $publishDateFrom, $publishDateTo, 't_.publishDate');
    // $qb->andWhere("t_.publishDate > :deadline1")->setParameter("deadline1", $deadline1);
    private function getWhereDateClause($interval, $date1, $date2, $field, QueryBuilder $qb, $prefix){

        if(!is_null($interval)){
            if($interval == "today"){
                $date = new \DateTime();
                $start = $date->setTime(0,0,0);
                $end = $date->setTime(23, 59, 59);
                $qb->andWhere($prefix.$field ." BETWEEN :start AND :end")->setParameter("start", $start)->setParameter('end', $end);
            }
            if($interval == "yesterday"){
                $start = new \DateTime();
                $end = clone  $start;
                $end->modify("- 1 days");
                $qb->andWhere($prefix.$field ." BETWEEN :start AND :end")->setParameter("start", $start)->setParameter('end', $end);
            }
            if($interval == "last7days"){
                $start = new \DateTime();
                $end = clone  $start;
                $end->modify("- 7 days");
                $qb->andWhere($prefix.$field ." BETWEEN :start AND :end")->setParameter("start", $start)->setParameter('end', $end);
            }
            if($interval == "last30days"){
                $start = new \DateTime();
                $end = clone  $start;
                $end->modify("- 30 days");
                $qb->andWhere($prefix.$field ." BETWEEN :start AND :end")->setParameter("start", $start)->setParameter('end', $end);
            }
            if($interval == "thismonth"){
                $start = new \DateTime();
                $end = clone  $start;
                $end->modify("first day of");
                $qb->andWhere($prefix.$field ." BETWEEN :start AND :end")->setParameter("start", $start)->setParameter('end', $end);
            }
            if($interval == "lastmonth"){
                $start = new \DateTime();
                $end = clone  $start;
                $end->modify("- 1 months");
                $qb->andWhere($prefix.$field ." BETWEEN :start AND :end")->setParameter("start", $start)->setParameter('end', $end);
            }
            if($interval == "customdate"){
                if(!is_null($date1)){
                    $qb->andWhere($prefix.$field." > :".$field)->setParameter($field, $date1);
                }
                elseif(!is_null($date2)){
                    $qb->andWhere($prefix.$field." < :".$field)->setParameter($field, $date2);
                }
            }
        }
    }



}