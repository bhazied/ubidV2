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
            $reference = !is_null($request->request->get('reference')) ? $request->request->get('reference') : null;
            $searchText = !is_null($request->request->get('searchText')) ? $request->request->get('searchText') : null;
            $countries = $request->request->get('countries') ? $request->request->get('countries') : array();
            $priceMaxValue =  !is_null($request->request->get('priceMaxValue'))? $request->request->get('priceMaxValue') : 0;
            $priceMinValue = !is_null($request->request->get('priceMinValue'))? $request->request->get('priceMinValue') : 0;
            $deadline1 = !is_null($request->request->get('deadline1')) ? $request->request->get('deadline1') : null;
            $deadline2 = !is_null($request->request->get('deadline2')) ? $request->request->get('deadline2') : null;
            $tender_categories = $request->request->get('tenderCategories') ? $request->request->get('tenderCategories') : array();
            $data = [
                'inlineCount' => 0,
                'queries' => [
                    'reference' => $reference,
                    'searchText' => $searchText,
                    'countries' => $countries,
                    'priceMinvalue' => $priceMinValue,
                    'priceMaxValue' => $priceMaxValue,
                    'deadline1' => $deadline1,
                    'deadline2' => $deadline2,
                    'tender_categories' => $tender_categories
                ],
                'results' => []
            ];
            $qb = $this->getDoctrine()->getManager()->createQueryBuilder();
            $qb->from("UbidElectricityBundle:Tender", "t_");
            if(!is_null($reference)){
                $qb->andWhere("t_.reference = :reference")
                    ->setParameter("reference", $reference);
            }
            if(!is_null($searchText)){
                $qb->andWhere($qb->expr()->like('t_.title', ':searchText'))
                    ->setParameter("searchText", $qb->expr()->literal("%".$searchText."%"));
            }
            if(count($countries) > 0){
                $qb->andWhere($qb->expr()->in("t_.country", ":countries"))->setParameter("countries", $countries);
            }
            if($priceMaxValue > 0){
                $qb->andWhere("t_.estimatedCost BETWEEN :priceMinvalue AND :priceMaxValue")
                    ->setParameter("priceMinvalue", $priceMinValue)
                    ->setParameter("priceMaxValue", $priceMaxValue);
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
                $qb->andWhere(":tender_categories MEMBER OF t_.tenderCategories")
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
}