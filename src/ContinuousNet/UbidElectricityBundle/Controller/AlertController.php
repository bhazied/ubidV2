<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\Alert;
use ContinuousNet\UbidElectricityBundle\Form\AlertType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Alert Controller
 * 
 * Manage Alerts 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\UbidElectricityBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see		AlertController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/alert")
 */
class AlertController extends BaseController
{
	/**
	 * Lists all Alert entities.
	 *
	 * @Route("/", name="alert_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$alerts = $em->getRepository('UbidElectricityBundle:Alert')->findAll();

		return $this->render('UbidElectricityBundle:Alert:index.html.twig', array(
			'alerts' => $alerts,
		));
	}

	/**
	 * Creates a new Alert entity.
	 *
	 * @Route("/new", name="alert_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$alert = new Alert();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\AlertType', $alert);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($alert);
			$em->flush();

			return $this->redirectToRoute('alert_show', array('id' => $alert->getId()));
		}

		return $this->render('UbidElectricityBundle:Alert:new.html.twig', array(
			'alert' => $alert,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Alert entity.
	 *
	 * @Route("/{id}", name="alert_show")
	 * @Method("GET")
	 */
	public function showAction(Alert $alert)
	{
		$deleteForm = $this->createDeleteForm($alert);

		return $this->render('UbidElectricityBundle:Alert:show.html.twig', array(
			'alert' => $alert,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Alert entity.
	 *
	 * @Route("/{id}/edit", name="alert_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Alert $alert)
	{
		$deleteForm = $this->createDeleteForm($alert);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\AlertType', $alert);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($alert);
			$em->flush();

			return $this->redirectToRoute('alert_edit', array('id' => $alert->getId()));
		}

		return $this->render('UbidElectricityBundle:Alert:edit.html.twig', array(
			'alert' => $alert,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Alert entity.
	 *
	 * @Route("/{id}", name="alert_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Alert $alert)
	{
		$form = $this->createDeleteForm($alert);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($alert);
			$em->flush();
		}

		return $this->redirectToRoute('alert_index');
	}

	/**
	 * Creates a form to delete a Alert entity.
	 *
	 * @param Alert $alert The Alert entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Alert $alert)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('alert_delete', array('id' => $alert->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
