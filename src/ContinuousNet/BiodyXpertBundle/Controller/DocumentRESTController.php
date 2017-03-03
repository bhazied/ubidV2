<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\Document;
use ContinuousNet\BiodyXpertBundle\Form\DocumentType;
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
 * Document REST Controller
 * 
 * Manage Documents 
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
 * @see      DocumentRESTController
 * @since      Class available since Release 1.0
 * @access    public
 * @RouteResource("Document")
 */
class DocumentRESTController extends BaseRESTController
{
    /**
     * Get a Document entity
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function getAction(Document $entity)
    {
        $this->createSubDirectory($entity);
        return $entity;
    }

    /**
     * Get all Document entities.
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
            $this->createSubDirectory(new Document());
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
            $qb->from('BiodyXpertBundle:Document', 'd_');
            $qb->leftJoin('ContinuousNet\BiodyXpertBundle\Entity\DocumentType', 'document_type', \Doctrine\ORM\Query\Expr\Join::WITH, 'd_.documentType = document_type.id');
            $qb->leftJoin('ContinuousNet\BiodyXpertBundle\Entity\Author', 'author', \Doctrine\ORM\Query\Expr\Join::WITH, 'd_.author = author.id');
            $qb->leftJoin('ContinuousNet\BiodyXpertBundle\Entity\Collection', 'collection', \Doctrine\ORM\Query\Expr\Join::WITH, 'd_.collection = collection.id');
            $qb->leftJoin('ContinuousNet\BiodyXpertBundle\Entity\User', 'creator_user', \Doctrine\ORM\Query\Expr\Join::WITH, 'd_.creatorUser = creator_user.id');
            $qb->leftJoin('ContinuousNet\BiodyXpertBundle\Entity\User', 'modifier_user', \Doctrine\ORM\Query\Expr\Join::WITH, 'd_.modifierUser = modifier_user.id');
            $textFields = array('document.name', 'document.slug', 'document.description', 'document.copyright');
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
                $_field = str_replace('document.', 'd_.', $field);
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
            $qbList = clone $qb;
            $qb->select('count(d_.id)');
            $data['inlineCount'] = $qb->getQuery()->getSingleScalarResult();
            foreach ($order_by as $field => $direction) {
                $field = str_replace('document.', 'd_.', $field);
                $qbList->addOrderBy($field, $direction);
            }
            $qbList->select('d_');
            $qbList->setMaxResults($limit);
            $qbList->setFirstResult($offset);
            $qbList->groupBy('d_.id');
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
     * Create a Document entity.
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
        $entity = new Document();
        $form = $this->createForm(new DocumentType(), $entity, array('method' => $request->getMethod()));
        $this->removeExtraFields($request, $form);
        $form->handleRequest($request);
        if ($form->isValid()) {
            $entity->setCreatorUser($this->getUser());
            $authorizedChangeTotalPreviewed = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalPreviewed = true;
                    }
                }
            }
            if (!$authorizedChangeTotalPreviewed) {
                $entity->setTotalPreviewed(null);
            }
            $authorizedChangeTotalDownloads = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalDownloads = true;
                    }
                }
            }
            if (!$authorizedChangeTotalDownloads) {
                $entity->setTotalDownloads(null);
            }
            $authorizedChangeTotalHits = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalHits = true;
                    }
                }
            }
            if (!$authorizedChangeTotalHits) {
                $entity->setTotalHits(null);
            }
            $authorizedChangeTotalComments = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalComments = true;
                    }
                }
            }
            if (!$authorizedChangeTotalComments) {
                $entity->setTotalComments(null);
            }
            $authorizedChangeTotalRatings = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalRatings = true;
                    }
                }
            }
            if (!$authorizedChangeTotalRatings) {
                $entity->setTotalRatings(null);
            }
            $authorizedChangeAverageRatings = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeAverageRatings = true;
                    }
                }
            }
            if (!$authorizedChangeAverageRatings) {
                $entity->setAverageRatings(null);
            }
            $authorizedChangeTotalLikes = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalLikes = true;
                    }
                }
            }
            if (!$authorizedChangeTotalLikes) {
                $entity->setTotalLikes(null);
            }
            $authorizedChangeTotalDislikes = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeTotalDislikes = true;
                    }
                }
            }
            if (!$authorizedChangeTotalDislikes) {
                $entity->setTotalDislikes(null);
            }
            $authorizedChangeToalBookmarks = false;
            $roles = $this->getUser()->getRoles();
            if (!empty($roles)) {
                foreach ($roles as $role) {
                    if (substr_count($role, 'ADM') > 0) {
                        $authorizedChangeToalBookmarks = true;
                    }
                }
            }
            if (!$authorizedChangeToalBookmarks) {
                $entity->setToalBookmarks(null);
            }
            $em->persist($entity);
            $em->flush();
            return $entity;
        }
    }

    /**
     * Update a Document entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function putAction(Request $request, Document $entity)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $request->setMethod('PATCH'); //Treat all PUTs as PATCH
            $previousDocumentCategories = $entity->getDocumentCategories()->toArray();
            foreach ($previousDocumentCategories as $previousDocumentCategory) {
                $entity->removeDocumentCategory($previousDocumentCategory);
            }
            $form = $this->createForm(new DocumentType(), $entity, array('method' => $request->getMethod()));
            $this->removeExtraFields($request, $form);
            $form->handleRequest($request);
            if ($form->isValid()) {
                $entity->setModifierUser($this->getUser());
                $authorizedChangeTotalPreviewed = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalPreviewed = true;
                        }
                    }
                }
                $authorizedChangeTotalDownloads = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalDownloads = true;
                        }
                    }
                }
                $authorizedChangeTotalHits = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalHits = true;
                        }
                    }
                }
                $authorizedChangeTotalComments = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalComments = true;
                        }
                    }
                }
                $authorizedChangeTotalRatings = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalRatings = true;
                        }
                    }
                }
                $authorizedChangeAverageRatings = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeAverageRatings = true;
                        }
                    }
                }
                $authorizedChangeTotalLikes = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalLikes = true;
                        }
                    }
                }
                $authorizedChangeTotalDislikes = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeTotalDislikes = true;
                        }
                    }
                }
                $authorizedChangeToalBookmarks = false;
                $roles = $this->getUser()->getRoles();
                if (!empty($roles)) {
                    foreach ($roles as $role) {
                        if (substr_count($role, 'ADM') > 0) {
                            $authorizedChangeToalBookmarks = true;
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
     * Partial Update to a Document entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function patchAction(Request $request, Document $entity)
    {
        return $this->putAction($request, $entity);
    }

    /**
     * Delete a Document entity.
     *
     * @View(statusCode=204)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function deleteAction(Request $request, Document $entity)
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
