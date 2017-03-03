<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\Note;
use ContinuousNet\BiodyXpertBundle\Form\NoteType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Note Controller
 * 
 * Manage Notes 
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
 * @see		NoteController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/note")
 */
class NoteController extends BaseController
{
	/**
	 * Lists all Note entities.
	 *
	 * @Route("/", name="note_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$notes = $em->getRepository('BiodyXpertBundle:Note')->findAll();

		return $this->render('BiodyXpertBundle:Note:index.html.twig', array(
			'notes' => $notes,
		));
	}

	/**
	 * Creates a new Note entity.
	 *
	 * @Route("/new", name="note_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$note = new Note();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\NoteType', $note);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($note);
			$em->flush();

			return $this->redirectToRoute('note_show', array('id' => $note->getId()));
		}

		return $this->render('BiodyXpertBundle:Note:new.html.twig', array(
			'note' => $note,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Note entity.
	 *
	 * @Route("/{id}", name="note_show")
	 * @Method("GET")
	 */
	public function showAction(Note $note)
	{
		$deleteForm = $this->createDeleteForm($note);

		return $this->render('BiodyXpertBundle:Note:show.html.twig', array(
			'note' => $note,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Note entity.
	 *
	 * @Route("/{id}/edit", name="note_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Note $note)
	{
		$deleteForm = $this->createDeleteForm($note);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\NoteType', $note);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($note);
			$em->flush();

			return $this->redirectToRoute('note_edit', array('id' => $note->getId()));
		}

		return $this->render('BiodyXpertBundle:Note:edit.html.twig', array(
			'note' => $note,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Note entity.
	 *
	 * @Route("/{id}", name="note_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Note $note)
	{
		$form = $this->createDeleteForm($note);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($note);
			$em->flush();
		}

		return $this->redirectToRoute('note_index');
	}

	/**
	 * Creates a form to delete a Note entity.
	 *
	 * @param Note $note The Note entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Note $note)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('note_delete', array('id' => $note->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
