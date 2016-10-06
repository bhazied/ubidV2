<?php

namespace ContinuousNet\BucksHunterBundle\Controller;

use ContinuousNet\BucksHunterBundle\Entity\Puzzle;
use ContinuousNet\BucksHunterBundle\Form\PuzzleType;
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
 * Puzzle REST Controller
 * 
 * Manage Puzzles 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 REST Controller
 * @package  ContinuousNet\BucksHunterBundle\Controller
 * @author    Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license  CONTINUOUS NET REGULAR LICENSE
 * @version  Release: 1.0
 * @link    http://buckshunter.continuousnet.com/ContinuousNet/BucksHunterBundle/Controller
 * @see      PuzzleRESTController
 * @since      Class available since Release 1.0
 * @access    public
 * @RouteResource("Puzzle")
 */
class PuzzleRESTController extends BaseRESTController
{
    /**
     * Get a Puzzle entity
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function getAction(Puzzle $entity)
    {
        $entity->dir = $this->getSubDirectory($entity, false);
        $this->createSubDirectory($entity);
        return $entity;
    }

    /**
     * Get all Puzzle entities.
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
            $qb->from('BucksHunterBundle:Puzzle', 'p_');
            $qb->leftJoin('ContinuousNet\BucksHunterBundle\Entity\Country', 'country', \Doctrine\ORM\Query\Expr\Join::WITH, 'p_.country = country.id');
            $qb->leftJoin('ContinuousNet\BucksHunterBundle\Entity\User', 'creator_user', \Doctrine\ORM\Query\Expr\Join::WITH, 'p_.creatorUser = creator_user.id');
            $qb->leftJoin('ContinuousNet\BucksHunterBundle\Entity\User', 'modifier_user', \Doctrine\ORM\Query\Expr\Join::WITH, 'p_.modifierUser = modifier_user.id');
            $textFields = array('puzzle.name', 'puzzle.picture', 'puzzle.url');
            foreach ($filters as $field => $value) {
                if (substr_count($field, '.') > 1) {
                    if ($value == 'true') {
                        list ($entityName, $listName, $listItem) = explode('.', $field);
                        $qb->andWhere(':'.$listName.'_value MEMBER OF p_.'.$listName)->setParameter($listName.'_value', $listItem);
                    }
                    continue;
                }
                $_field = str_replace('puzzle.', 'p_.', $field);
                $key = str_replace('.', '', $field);
                if (!empty($value)) {
                   if (in_array($field, $textFields)) {
                       $qb->andWhere($qb->expr()->like($_field, $qb->expr()->literal('%' . $value . '%')));
                   } else {
                       $qb->andWhere($_field.' = :'.$key.'')->setParameter($key, $value);
                   }
                }
            }
            $qbList = clone $qb;
            $qb->select('count(p_.id)');
            $data['inlineCount'] = $qb->getQuery()->getSingleScalarResult();
            foreach ($order_by as $field => $direction) {
                $field = str_replace('puzzle.', 'p_.', $field);
                $qbList->addOrderBy($field, $direction);
            }
            $qbList->select('p_');
            $qbList->setMaxResults($limit);
            $qbList->setFirstResult($offset);
            $qbList->groupBy('p_.id');
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
     * Create a Puzzle entity.
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
        $batch = $request->request->get('batch');
        $selectedFile = $request->request->get('picture');
        $filePath = $this->getConfig('uplopad.main_dir') . $selectedFile;
        $finder = new Finder();
        if (!is_null($batch)) {
            $finder->files()->in(dirname($filePath))->sortByName();
        } else {
            $finder->append(array($filePath));
        }
        foreach ($finder as $file) {
            $filePath = str_replace($this->getConfig('uplopad.main_dir'), '', $file->getRealpath());
            $request->request->set('picture', $filePath);
            $path_parts = pathinfo($filePath);
            if (!is_null($batch)) {
                $request->request->set('name', $path_parts['filename']);
            }
            $entity = new Puzzle();
            if ($selectedFile == $filePath) {
                $request->request->set('is_top', true);
            } else {
                $request->request->set('is_top', false);
            }
            $form = $this->createForm(new PuzzleType(), $entity, array('method' => $request->getMethod()));
            $this->removeExtraFields($request, $form);
            $form->handleRequest($request);
            if ($form->isValid()) {
                $em = $this->getDoctrine()->getManager();
                if (!$em->isOpen()) {
                   $this->getDoctrine()->resetManager();
                   $em = $this->getDoctrine()->getManager();
                }
                $entity->setCreatorUser($this->getUser());
                $em->persist($entity);
                    $entities[] = $entity;
            }
        }
        try {
            $em->flush();
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
        return $entities;
    }

    /**
     * Update a Puzzle entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function putAction(Request $request, Puzzle $entity)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $request->setMethod('PATCH'); //Treat all PUTs as PATCH
            $form = $this->createForm(new PuzzleType(), $entity, array('method' => $request->getMethod()));
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
     * Partial Update to a Puzzle entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function patchAction(Request $request, Puzzle $entity)
    {
        return $this->putAction($request, $entity);
    }

    /**
     * Delete a Puzzle entity.
     *
     * @View(statusCode=204)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function deleteAction(Request $request, Puzzle $entity)
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
    
    private function getConfig($path) {
        $config = $this->container->getParameter('bucks_hunter');
        $paths = explode('.', $path);
        foreach ($paths as $index) {
            $config = $config[$index];
        }
        return $config;
    }

}
