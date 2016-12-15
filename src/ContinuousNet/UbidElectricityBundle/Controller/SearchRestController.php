<?php
/**
 * Created by PhpStorm.
 * User: Ben Hadj Amor Zied
 * Date: 24/10/16
 * Time: 10:01
 */

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\Tender;
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

class SearchRestController extends FOSRestController {


    /**
     * @POST("/sr")
     * @View(serializerEnableMaxDepthChecks=true)
     * @param Request $request
     */
    public function srAction(Request $request){

        try{
            $countries = $request->request->get('countries') ? $request->request->get('countries') : array();
            $totalCosvalue =  !is_null($request->request->get('priceMaxValue'))? $request->request->get('total_cos_value') : 0;
            $totalCostOperator = ! !is_null($request->request->get('total_cost_operator'))? $request->request->get('total_cost_operator') : "equalto";
            $publisDate = !is_null($request->request->get('publish_date')) ? $request->request->get('publish_date') : 'today';
            $publisDateFrom = !is_null($request->request->get('publish_date_from')) ? $request->request->get('publish_date_from') : null;
            $publisDateTo = !is_null($request->request->get('publish_date_to')) ? $request->request->get('publish_date_to') : null;
            $deadline1 = !is_null($request->request->get('deadline1')) ? $request->request->get('deadline1') : null;
            $deadline2 = !is_null($request->request->get('deadline2')) ? $request->request->get('deadline2') : null;
            $tender_categories = $request->request->get('tenderCategories') ? $request->request->get('tenderCategories') : array();
            $operator = array(
                "morethan" => ">",
                "lessthan" => "<",
                "equalto" => "="
            );
            $data = [
                'inlineCount' => 0,
                'queries' => [
                    'countries' => $countries,
                    'total_cos_value' => $totalCosvalue,
                    'total_cost_operator' => $totalCostOperator,
                    'publish_date' => $publisDate,
                    'publish_date_from' => $publisDateFrom,
                    'publish_date_to' => $publisDateTo,
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
            if(!is_null($totalCostOperator)){
                $qb->andWhere("t_.estimatedCost ".$operator[$totalCostOperator]." :totalCosvalue")
                    ->setParameter("totalCosvalue", $totalCosvalue);
            }
            if(!is_null($deadline1)){
                $qb->andWhere("t_.publishDate > :deadline1")
                    ->setParameter("deadline1", $deadline1);
            }
            if(!is_null($deadline2)){
                $qb->andWhere("t_.publishDate < :deadline2")
                    ->setParameter("deadline2", $deadline2);
            }
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

    private function getWhereDateClause($interval, $date1, $date2){
        
    }

}