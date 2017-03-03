<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\Session;
use ContinuousNet\BiodyXpertBundle\Form\SessionType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Session Controller
 * 
 * Manage Sessions 
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
 * @see		SessionController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/session")
 */
class SessionController extends BaseController
{
	/**
	 * Lists all Session entities.
	 *
	 * @Route("/", name="session_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$sessions = $em->getRepository('BiodyXpertBundle:Session')->findAll();

		return $this->render('BiodyXpertBundle:Session:index.html.twig', array(
			'sessions' => $sessions,
		));
	}

	/**
	 * Creates a new Session entity.
	 *
	 * @Route("/new", name="session_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$session = new Session();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\SessionType', $session);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($session);
			$em->flush();

			return $this->redirectToRoute('session_show', array('id' => $session->getId()));
		}

		return $this->render('BiodyXpertBundle:Session:new.html.twig', array(
			'session' => $session,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Session entity.
	 *
	 * @Route("/{id}", name="session_show")
	 * @Method("GET")
	 */
	public function showAction(Session $session)
	{
		$deleteForm = $this->createDeleteForm($session);

		return $this->render('BiodyXpertBundle:Session:show.html.twig', array(
			'session' => $session,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Session entity.
	 *
	 * @Route("/{id}/edit", name="session_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Session $session)
	{
		$deleteForm = $this->createDeleteForm($session);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\SessionType', $session);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($session);
			$em->flush();

			return $this->redirectToRoute('session_edit', array('id' => $session->getId()));
		}

		return $this->render('BiodyXpertBundle:Session:edit.html.twig', array(
			'session' => $session,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Session entity.
	 *
	 * @Route("/{id}", name="session_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Session $session)
	{
		$form = $this->createDeleteForm($session);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($session);
			$em->flush();
		}

		return $this->redirectToRoute('session_index');
	}

	/**
	 * Creates a form to delete a Session entity.
	 *
	 * @param Session $session The Session entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Session $session)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('session_delete', array('id' => $session->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
