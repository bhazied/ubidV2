<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\Message;
use ContinuousNet\UbidElectricityBundle\Form\MessageType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Message Controller
 * 
 * Manage Messages 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\UbidElectricityBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see		MessageController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/message")
 */
class MessageController extends BaseController
{
	/**
	 * Lists all Message entities.
	 *
	 * @Route("/", name="message_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$messages = $em->getRepository('UbidElectricityBundle:Message')->findAll();

		return $this->render('UbidElectricityBundle:Message:index.html.twig', array(
			'messages' => $messages,
		));
	}

	/**
	 * Creates a new Message entity.
	 *
	 * @Route("/new", name="message_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$message = new Message();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\MessageType', $message);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($message);
			$em->flush();

			return $this->redirectToRoute('message_show', array('id' => $message->getId()));
		}

		return $this->render('UbidElectricityBundle:Message:new.html.twig', array(
			'message' => $message,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Message entity.
	 *
	 * @Route("/{id}", name="message_show")
	 * @Method("GET")
	 */
	public function showAction(Message $message)
	{
		$deleteForm = $this->createDeleteForm($message);

		return $this->render('UbidElectricityBundle:Message:show.html.twig', array(
			'message' => $message,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Message entity.
	 *
	 * @Route("/{id}/edit", name="message_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Message $message)
	{
		$deleteForm = $this->createDeleteForm($message);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\MessageType', $message);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($message);
			$em->flush();

			return $this->redirectToRoute('message_edit', array('id' => $message->getId()));
		}

		return $this->render('UbidElectricityBundle:Message:edit.html.twig', array(
			'message' => $message,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Message entity.
	 *
	 * @Route("/{id}", name="message_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Message $message)
	{
		$form = $this->createDeleteForm($message);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($message);
			$em->flush();
		}

		return $this->redirectToRoute('message_index');
	}

	/**
	 * Creates a form to delete a Message entity.
	 *
	 * @param Message $message The Message entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Message $message)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('message_delete', array('id' => $message->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
