<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\DocumentCategory;
use ContinuousNet\BiodyXpertBundle\Form\DocumentCategoryType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Document Category Controller
 * 
 * Manage DocumentCategories 
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
 * @see		DocumentCategoryController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/documentcategory")
 */
class DocumentCategoryController extends BaseController
{
	/**
	 * Lists all DocumentCategory entities.
	 *
	 * @Route("/", name="documentcategory_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$documentCategories = $em->getRepository('BiodyXpertBundle:DocumentCategory')->findAll();

		return $this->render('BiodyXpertBundle:DocumentCategory:index.html.twig', array(
			'documentCategories' => $documentCategories,
		));
	}

	/**
	 * Creates a new DocumentCategory entity.
	 *
	 * @Route("/new", name="documentcategory_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$documentCategory = new DocumentCategory();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\DocumentCategoryType', $documentCategory);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($documentCategory);
			$em->flush();

			return $this->redirectToRoute('documentcategory_show', array('id' => $documentCategory->getId()));
		}

		return $this->render('BiodyXpertBundle:DocumentCategory:new.html.twig', array(
			'documentCategory' => $documentCategory,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a DocumentCategory entity.
	 *
	 * @Route("/{id}", name="documentcategory_show")
	 * @Method("GET")
	 */
	public function showAction(DocumentCategory $documentCategory)
	{
		$deleteForm = $this->createDeleteForm($documentCategory);

		return $this->render('BiodyXpertBundle:DocumentCategory:show.html.twig', array(
			'documentCategory' => $documentCategory,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing DocumentCategory entity.
	 *
	 * @Route("/{id}/edit", name="documentcategory_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, DocumentCategory $documentCategory)
	{
		$deleteForm = $this->createDeleteForm($documentCategory);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\DocumentCategoryType', $documentCategory);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($documentCategory);
			$em->flush();

			return $this->redirectToRoute('documentcategory_edit', array('id' => $documentCategory->getId()));
		}

		return $this->render('BiodyXpertBundle:DocumentCategory:edit.html.twig', array(
			'documentCategory' => $documentCategory,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a DocumentCategory entity.
	 *
	 * @Route("/{id}", name="documentcategory_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, DocumentCategory $documentCategory)
	{
		$form = $this->createDeleteForm($documentCategory);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($documentCategory);
			$em->flush();
		}

		return $this->redirectToRoute('documentcategory_index');
	}

	/**
	 * Creates a form to delete a DocumentCategory entity.
	 *
	 * @param DocumentCategory $documentCategory The DocumentCategory entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(DocumentCategory $documentCategory)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('documentcategory_delete', array('id' => $documentCategory->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
