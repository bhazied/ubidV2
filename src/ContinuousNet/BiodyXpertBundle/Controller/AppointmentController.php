<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\Appointment;
use ContinuousNet\BiodyXpertBundle\Form\AppointmentType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Appointment Controller
 * 
 * Manage Appointments 
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
 * @see		AppointmentController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/appointment")
 */
class AppointmentController extends BaseController
{
	/**
	 * Lists all Appointment entities.
	 *
	 * @Route("/", name="appointment_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$appointments = $em->getRepository('BiodyXpertBundle:Appointment')->findAll();

		return $this->render('BiodyXpertBundle:Appointment:index.html.twig', array(
			'appointments' => $appointments,
		));
	}

	/**
	 * Creates a new Appointment entity.
	 *
	 * @Route("/new", name="appointment_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$appointment = new Appointment();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\AppointmentType', $appointment);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($appointment);
			$em->flush();

			return $this->redirectToRoute('appointment_show', array('id' => $appointment->getId()));
		}

		return $this->render('BiodyXpertBundle:Appointment:new.html.twig', array(
			'appointment' => $appointment,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Appointment entity.
	 *
	 * @Route("/{id}", name="appointment_show")
	 * @Method("GET")
	 */
	public function showAction(Appointment $appointment)
	{
		$deleteForm = $this->createDeleteForm($appointment);

		return $this->render('BiodyXpertBundle:Appointment:show.html.twig', array(
			'appointment' => $appointment,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Appointment entity.
	 *
	 * @Route("/{id}/edit", name="appointment_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Appointment $appointment)
	{
		$deleteForm = $this->createDeleteForm($appointment);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\AppointmentType', $appointment);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($appointment);
			$em->flush();

			return $this->redirectToRoute('appointment_edit', array('id' => $appointment->getId()));
		}

		return $this->render('BiodyXpertBundle:Appointment:edit.html.twig', array(
			'appointment' => $appointment,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Appointment entity.
	 *
	 * @Route("/{id}", name="appointment_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Appointment $appointment)
	{
		$form = $this->createDeleteForm($appointment);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($appointment);
			$em->flush();
		}

		return $this->redirectToRoute('appointment_index');
	}

	/**
	 * Creates a form to delete a Appointment entity.
	 *
	 * @param Appointment $appointment The Appointment entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Appointment $appointment)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('appointment_delete', array('id' => $appointment->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
