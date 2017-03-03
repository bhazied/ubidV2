<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\DocumentType;
use ContinuousNet\BiodyXpertBundle\Form\DocumentTypeType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Document Type Controller
 * 
 * Manage DocumentTypes 
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
 * @see		DocumentTypeController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/documenttype")
 */
class DocumentTypeController extends BaseController
{
	/**
	 * Lists all DocumentType entities.
	 *
	 * @Route("/", name="documenttype_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$documentTypes = $em->getRepository('BiodyXpertBundle:DocumentType')->findAll();

		return $this->render('BiodyXpertBundle:DocumentType:index.html.twig', array(
			'documentTypes' => $documentTypes,
		));
	}

	/**
	 * Creates a new DocumentType entity.
	 *
	 * @Route("/new", name="documenttype_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$documentType = new DocumentType();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\DocumentTypeType', $documentType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($documentType);
			$em->flush();

			return $this->redirectToRoute('documenttype_show', array('id' => $documentType->getId()));
		}

		return $this->render('BiodyXpertBundle:DocumentType:new.html.twig', array(
			'documentType' => $documentType,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a DocumentType entity.
	 *
	 * @Route("/{id}", name="documenttype_show")
	 * @Method("GET")
	 */
	public function showAction(DocumentType $documentType)
	{
		$deleteForm = $this->createDeleteForm($documentType);

		return $this->render('BiodyXpertBundle:DocumentType:show.html.twig', array(
			'documentType' => $documentType,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing DocumentType entity.
	 *
	 * @Route("/{id}/edit", name="documenttype_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, DocumentType $documentType)
	{
		$deleteForm = $this->createDeleteForm($documentType);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\DocumentTypeType', $documentType);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($documentType);
			$em->flush();

			return $this->redirectToRoute('documenttype_edit', array('id' => $documentType->getId()));
		}

		return $this->render('BiodyXpertBundle:DocumentType:edit.html.twig', array(
			'documentType' => $documentType,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a DocumentType entity.
	 *
	 * @Route("/{id}", name="documenttype_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, DocumentType $documentType)
	{
		$form = $this->createDeleteForm($documentType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($documentType);
			$em->flush();
		}

		return $this->redirectToRoute('documenttype_index');
	}

	/**
	 * Creates a form to delete a DocumentType entity.
	 *
	 * @param DocumentType $documentType The DocumentType entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(DocumentType $documentType)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('documenttype_delete', array('id' => $documentType->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
