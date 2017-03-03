<?php

namespace ContinuousNet\SportClubBundle\Controller;

use ContinuousNet\SportClubBundle\Entity\Audio;
use ContinuousNet\SportClubBundle\Form\AudioType;
use ContinuousNet\SportClubBundle\Entity\Album;
use ContinuousNet\SportClubBundle\Entity\Artist;
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
 * Audio REST Controller
 * 
 * Manage Audios 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 REST Controller
 * @package  ContinuousNet\SportClubBundle\Controller
 * @author    Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license  CONTINUOUS NET REGULAR LICENSE
 * @version  Release: 1.0
 * @link    http://sportclub.continuousnet.com/ContinuousNet/SportClubBundle/Controller
 * @see      AudioRESTController
 * @since      Class available since Release 1.0
 * @access    public
 * @RouteResource("Audio")
 */
class AudioRESTController extends BaseRESTController
{
    /**
     * Get a Audio entity
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function getAction(Audio $entity)
    {
        $this->createSubDirectory($entity);
        return $entity;
    }

    /**
     * Get all Audio entities.
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
            $this->createSubDirectory(new Audio());
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
            $qb->from('SportClubBundle:Audio', 'a_');
            $qb->leftJoin('ContinuousNet\SportClubBundle\Entity\AudioType', 'audio_type', \Doctrine\ORM\Query\Expr\Join::WITH, 'a_.audioType = audio_type.id');
            $qb->leftJoin('ContinuousNet\SportClubBundle\Entity\Price', 'price', \Doctrine\ORM\Query\Expr\Join::WITH, 'a_.price = price.id');
            $qb->leftJoin('ContinuousNet\SportClubBundle\Entity\Sharing', 'sharing', \Doctrine\ORM\Query\Expr\Join::WITH, 'a_.sharing = sharing.id');
            $qb->leftJoin('ContinuousNet\SportClubBundle\Entity\Album', 'album', \Doctrine\ORM\Query\Expr\Join::WITH, 'a_.album = album.id');
            $qb->leftJoin('ContinuousNet\SportClubBundle\Entity\Artist', 'artist', \Doctrine\ORM\Query\Expr\Join::WITH, 'a_.artist = artist.id');
            $qb->leftJoin('ContinuousNet\SportClubBundle\Entity\User', 'creator_user', \Doctrine\ORM\Query\Expr\Join::WITH, 'a_.creatorUser = creator_user.id');
            $qb->leftJoin('ContinuousNet\SportClubBundle\Entity\User', 'modifier_user', \Doctrine\ORM\Query\Expr\Join::WITH, 'a_.modifierUser = modifier_user.id');
            $textFields = array('audio.name', 'audio.nameAr', 'audio.nameFr', 'audio.slug', 'audio.slugAr', 'audio.slugFr', 'audio.code', 'audio.description', 'audio.descriptionAr', 'audio.descriptionFr', 'audio.url', 'audio.alternativeUrl', 'audio.copyright', 'audio.metaData');
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
                $_field = str_replace('audio.', 'a_.', $field);
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
            $qb->select('count(a_.id)');
            $data['inlineCount'] = $qb->getQuery()->getSingleScalarResult();
            foreach ($order_by as $field => $direction) {
                $field = str_replace('audio.', 'a_.', $field);
                $qbList->addOrderBy($field, $direction);
            }
            $qbList->select('a_');
            $qbList->setMaxResults($limit);
            $qbList->setFirstResult($offset);
            $qbList->groupBy('a_.id');
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
     * Create a Audio entity.
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
        if ($request->request->get('album') == -1) {
            $album = new Album();
            $album->setName($request->request->get('albumName'));
            $album->setCreatorUser($this->getUser());
            $album->setIsPublished(false);
            $album->setIsRecommended(false);
            $em->persist($album);
            $em->flush();
            $request->request->set('album', $album->getId());
        }
        if ($request->request->get('artist') == -1) {
            $artist = new Artist();
            $artist->setName($request->request->get('artistName'));
            $artist->setCreatorUser($this->getUser());
            $artist->setIsPublished(false);
            $artist->setIsRecommended(false);
            $em->persist($artist);
            $em->flush();
            $request->request->set('artist', $artist->getId());
        }
        $entity = new Audio();
        $form = $this->createForm(new AudioType(), $entity, array('method' => $request->getMethod()));
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
     * Update a Audio entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function putAction(Request $request, Audio $entity)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $request->setMethod('PATCH'); //Treat all PUTs as PATCH
            $previousAudioCategories = $entity->getAudioCategories()->toArray();
            foreach ($previousAudioCategories as $previousAudioCategory) {
                $entity->removeAudioCategory($previousAudioCategory);
            }
            if ($request->request->get('album') == -1) {
                $album = new Album();
                $album->setName($request->request->get('albumName'));
                $album->setCreatorUser($this->getUser());
                $em->persist($album);
                $em->flush();
                $request->request->set('album', $album->getId());
            }
            if ($request->request->get('artist') == -1) {
                $artist = new Artist();
                $artist->setName($request->request->get('artistName'));
                $artist->setCreatorUser($this->getUser());
                $em->persist($artist);
                $em->flush();
                $request->request->set('artist', $artist->getId());
            }
            $form = $this->createForm(new AudioType(), $entity, array('method' => $request->getMethod()));
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
     * Partial Update to a Audio entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function patchAction(Request $request, Audio $entity)
    {
        return $this->putAction($request, $entity);
    }

    /**
     * Delete a Audio entity.
     *
     * @View(statusCode=204)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function deleteAction(Request $request, Audio $entity)
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
