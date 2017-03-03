<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\Collection;
use ContinuousNet\BiodyXpertBundle\Form\CollectionType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Collection Controller
 * 
 * Manage Collections 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\BiodyXpertBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://biodyxpert.continuousnet.com/ContinuousNet/BiodyXpertBundle/Controller
 * @see		CollectionController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/collection")
 */
class CollectionController extends BaseController
{
	/**
	 * Lists all Collection entities.
	 *
	 * @Route("/", name="collection_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$collections = $em->getRepository('BiodyXpertBundle:Collection')->findAll();

		return $this->render('BiodyXpertBundle:Collection:index.html.twig', array(
			'collections' => $collections,
		));
	}

	/**
	 * Creates a new Collection entity.
	 *
	 * @Route("/new", name="collection_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$collection = new Collection();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\CollectionType', $collection);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($collection);
			$em->flush();

			return $this->redirectToRoute('collection_show', array('id' => $collection->getId()));
		}

		return $this->render('BiodyXpertBundle:Collection:new.html.twig', array(
			'collection' => $collection,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Collection entity.
	 *
	 * @Route("/{id}", name="collection_show")
	 * @Method("GET")
	 */
	public function showAction(Collection $collection)
	{
		$deleteForm = $this->createDeleteForm($collection);

		return $this->render('BiodyXpertBundle:Collection:show.html.twig', array(
			'collection' => $collection,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Collection entity.
	 *
	 * @Route("/{id}/edit", name="collection_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Collection $collection)
	{
		$deleteForm = $this->createDeleteForm($collection);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\CollectionType', $collection);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($collection);
			$em->flush();

			return $this->redirectToRoute('collection_edit', array('id' => $collection->getId()));
		}

		return $this->render('BiodyXpertBundle:Collection:edit.html.twig', array(
			'collection' => $collection,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Collection entity.
	 *
	 * @Route("/{id}", name="collection_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Collection $collection)
	{
		$form = $this->createDeleteForm($collection);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($collection);
			$em->flush();
		}

		return $this->redirectToRoute('collection_index');
	}

	/**
	 * Creates a form to delete a Collection entity.
	 *
	 * @param Collection $collection The Collection entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Collection $collection)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('collection_delete', array('id' => $collection->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
