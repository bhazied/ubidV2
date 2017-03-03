<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\Document;
use ContinuousNet\BiodyXpertBundle\Form\DocumentType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Document Controller
 * 
 * Manage Documents 
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
 * @see		DocumentController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/document")
 */
class DocumentController extends BaseController
{
	/**
	 * Lists all Document entities.
	 *
	 * @Route("/", name="document_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$documents = $em->getRepository('BiodyXpertBundle:Document')->findAll();

		return $this->render('BiodyXpertBundle:Document:index.html.twig', array(
			'documents' => $documents,
		));
	}

	/**
	 * Creates a new Document entity.
	 *
	 * @Route("/new", name="document_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$document = new Document();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\DocumentType', $document);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($document);
			$em->flush();

			return $this->redirectToRoute('document_show', array('id' => $document->getId()));
		}

		return $this->render('BiodyXpertBundle:Document:new.html.twig', array(
			'document' => $document,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Document entity.
	 *
	 * @Route("/{id}", name="document_show")
	 * @Method("GET")
	 */
	public function showAction(Document $document)
	{
		$deleteForm = $this->createDeleteForm($document);

		return $this->render('BiodyXpertBundle:Document:show.html.twig', array(
			'document' => $document,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Document entity.
	 *
	 * @Route("/{id}/edit", name="document_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Document $document)
	{
		$deleteForm = $this->createDeleteForm($document);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\DocumentType', $document);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($document);
			$em->flush();

			return $this->redirectToRoute('document_edit', array('id' => $document->getId()));
		}

		return $this->render('BiodyXpertBundle:Document:edit.html.twig', array(
			'document' => $document,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Document entity.
	 *
	 * @Route("/{id}", name="document_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Document $document)
	{
		$form = $this->createDeleteForm($document);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($document);
			$em->flush();
		}

		return $this->redirectToRoute('document_index');
	}

	/**
	 * Creates a form to delete a Document entity.
	 *
	 * @param Document $document The Document entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Document $document)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('document_delete', array('id' => $document->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
